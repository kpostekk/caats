import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
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
      },
    })
  }

  getUser(id: string) {
    return this.prisma.user.findUnique({ where: { id } })
  }

  updateUser(id: string, partial: Partial<User>) {
    return this.prisma.user.update({
      where: { id },
      data: partial,
    })
  }
}
