import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class BrowserService {
  constructor(private readonly prisma: PrismaService) {}

  search(query: string) {
    return this.prisma.taskResult.findMany({
      where: {
        html: {
          search: query,
        },
        task: {
          status: 'SUCCESS',
        },
      },
      select: {
        object: true,
        createdAt: true,
      },
    })
  }
}
