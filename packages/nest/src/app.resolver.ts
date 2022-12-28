import { App } from 'src/_autogen/gql'
import { Resolver, Query } from '@nestjs/graphql'
import fs from 'fs/promises'

async function getVersion(): Promise<string | undefined> {
  return JSON.parse((await fs.readFile('package.json')).toString()).version
}

@Resolver()
export class AppResolver {
  @Query()
  async app(): Promise<App> {
    return {
      version: await getVersion(),
      node: process.version,
      platform: process.platform,
    }
  }
}
