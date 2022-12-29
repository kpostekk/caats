import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUserIfNotExists(email: string, name?: string, picture?: string) {
    const userExists = await this.prisma.user.findUnique({ where: { email } })
    if (userExists) {
      await this.prisma.user.update({
        where: { id: userExists.id },
        data: {
          picture,
          name,
        },
      })

      return await this.prisma.user.findUnique({ where: { id: userExists.id } })
    }

    return await this.prisma.user.create({
      data: {
        email,
        name,
        picture,
        groups: ['WIs I.3 - 17c', 'WIs I.3 - 1w'],
      },
    })
  }

  getUser(id: string) {
    return this.prisma.user.findUnique({ where: { id } })
  }
}
