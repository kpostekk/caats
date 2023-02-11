import { Query, Resolver, Args } from '@nestjs/graphql'
import { GqlQueryGroupsArgs } from '../gql'
import { PrismaService } from '../prisma/prisma.service'
import { BrowserService } from './browser.service'

@Resolver()
export class BrowserResolver {
  constructor(
    private readonly browser: BrowserService,
    private readonly prisma: PrismaService
  ) {}

  @Query()
  findByDescription(@Args('query') query: string) {
    return this.browser.findByDescription(query)
  }

  @Query()
  async groups(@Args() args: GqlQueryGroupsArgs) {
    if (!args.filter) {
      const groups = await this.prisma.$queryRaw<
        {
          group: string
        }[]
      >`SELECT DISTINCT unnest(groups) as "group" FROM "TimetableEvent"`

      return groups.map((v) => v.group)
    }

    const generatedRegexString =
      '^' +
      args.filter
        .slice(0, 3)
        .map((v) => `[${v.join('')}]`)
        .join('') +
      ` (${(args.filter[3] ?? []).join('|')})` +
      '[.]' +
      `(${(args.filter[4] ?? []).join('|')})` +
      ' (-|(OB[.])?[A-Z]+|[A-Z]_[A-Z]+) ' +
      `(${(args.filter[6] ?? []).join('|')})` +
      (args.filter[5][0] ?? '') +
      '$'

    try {
      const groups = await this.prisma.$queryRaw<
        {
          group: string
        }[]
      >`SELECT "group" FROM (SELECT DISTINCT unnest(groups) as "group" FROM "TimetableEvent") as "groups" WHERE "group" ~ ${generatedRegexString} ORDER BY "group"`
      return groups.map((v) => v.group)
    } catch {
      return []
    }
  }
}
