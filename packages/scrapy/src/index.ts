import { gql, GraphQLClient } from 'graphql-request'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { getSdk } from './gql/sdk'
import { Stealer } from './stealer'
import { createClient, Client } from 'graphql-ws'
import { AwaitTaskSubscription } from './gql/graphql'
import { WebSocket } from 'ws'

process.on('SIGINT', () => process.exit(1))
process.on('SIGTERM', () => process.exit(1))

async function checkForTasks(
  wsClient: Client,
  gqlClient: GraphQLClient,
  rate = 16
) {
  const sdk = getSdk(gqlClient)
  // const tasks = await sdk.getTasks()
  const fullTask = await new Promise<AwaitTaskSubscription | null | undefined>(
    (resolve, reject) =>
      wsClient.subscribe<AwaitTaskSubscription>(
        {
          query: gql`
            subscription awaitTask {
              receiveTask {
                id
                date
                hash
              }
            }
          `,
        },
        {
          complete: () => resolve(null),
          error: (e) => reject(e),
          next: (data) => resolve(data.data),
        }
      )
  )

  // await sdk.updateTaskState({
  //   id: task.id,
  // })
  console.log({ fullTask })
  if (!fullTask || !fullTask.receiveTask) return

  const task = fullTask.receiveTask
  console.log({ task })

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
  } finally {
    await wsClient.dispose()
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
        .option('token', {
          type: 'string',
          demandOption: true,
        })
        .option('rate', {
          type: 'number',
        }),
    async ({ api, rate, token }) => {
      const wsUrl = new URL(api)

      switch (wsUrl.protocol) {
        case 'https:':
          wsUrl.protocol = 'wss:'
          break
        case 'http:':
          wsUrl.protocol = 'ws:'
          break
        default:
          throw new Error('Invalid protocol')
      }

      const wsClient = createClient({
        url: wsUrl.toString(),
        connectionParams: {
          authorization: `Bearer ${token}`,
        },
        webSocketImpl: WebSocket,
      })

      console.log('Starting Stealer...')
      const gqlClient = new GraphQLClient(api, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        // fetch,
      })

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const disposition = await checkForTasks(wsClient, gqlClient, rate)

        if (disposition === 'skipped') {
          console.log('Task skipped! (╯°□°）╯︵ ┻━┻')
          await new Promise((r) => setTimeout(r, 200))
        } else if (disposition === 'failed') {
          console.log('Task failed! Cooling down... (。﹏。)')
          await new Promise((r) => setTimeout(r, 5_000))
        } else {
          console.log('Task succeeded! o((>ω< ))o')
          await new Promise((r) => setTimeout(r, 500))
        }
      }
    }
  )
  .demandCommand()
  .showHelpOnFail(false)
  .parse()
