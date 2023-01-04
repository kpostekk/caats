import { GraphQLClient } from 'graphql-request'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { getSdk } from './gql/sdk'
import { Stealer } from './stealer'

process.on('SIGINT', () => process.exit(1))
process.on('SIGTERM', () => process.exit(1))

async function checkForTasks(client: GraphQLClient, rate = 16) {
  const sdk = getSdk(client)
  const tasks = await sdk.getTasks()

  if (tasks.getTasks.length === 0) {
    return 'no tasks remaining'
  }

  const task = tasks.getTasks[0]
  await sdk.updateTaskState({
    id: task.id,
  })

  try {
    const r = await new Stealer(task.date, task.hash ?? undefined, rate).steal()

    if (r === null) {
      await sdk.skipTask({ id: task.id })
      return 'skipped'
    }

    await sdk.finishTask({
      id: task.id,
      results: r,
    })
  } catch (e) {
    console.error(e)
    await sdk.failTask({ id: task.id }).catch((e) => console.error(e))
    return 'failed'
  }

  return 'succeeded'
}

yargs(hideBin(process.argv))
  .command(
    'steal',
    'Starts stealing',
    (args) =>
      args
        .option('api', {
          alias: 'graphql',
          type: 'string',
          demandOption: true,
        })
        .option('rate', {
          type: 'number',
        }),
    async ({ api, rate }) => {
      console.log('Starting Stealer...')
      const gqlClient = new GraphQLClient(api)
      const sdk = getSdk(gqlClient)

      console.log(await sdk.getAppVersion())
      let noTaskMsg = false

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const disposition = await checkForTasks(gqlClient, rate)

        if (disposition === 'skipped') {
          console.log('Task skipped! (╯°□°）╯︵ ┻━┻')
          await new Promise((r) => setTimeout(r, 250))
        } else if (disposition === 'no tasks remaining') {
          if (!noTaskMsg) console.log('No tasks remaining 👈(ﾟヮﾟ👈)')
          noTaskMsg = true
          await new Promise((r) => setTimeout(r, 10_000))
        } else if (disposition === 'failed') {
          console.log('Task failed! Cooling down... (。﹏。)')
          await new Promise((r) => setTimeout(r, 30_000))
        } else {
          console.log('Task succeeded! o((>ω< ))o')
          await new Promise((r) => setTimeout(r, 500))
        }

        if (disposition !== 'no tasks remaining') {
          noTaskMsg = false
        }
      }
    }
  )
  .demandCommand()
  .showHelpOnFail(false)
  .parse()
