import { Test, TestingModule } from '@nestjs/testing'
import { SupervisorModule } from './supervisor.module'
import { SupervisorService } from './supervisor.service'
import { DeepMockProxy, mock, mockDeep } from 'jest-mock-extended'
import { PrismaClient } from '@prisma/client'
import { AuthModule } from '../auth/auth.module'
import { PrismaModule } from '../prisma/prisma.module'
import { ParserModule } from './parser/parser.module'
import { EmitterModule } from '../emitter/emitter.module'
import { PrismaService } from '../prisma/prisma.service'
import { ParserService } from './parser/parser.service'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { EmitterService } from '../emitter/emitter.service'
import { readFile } from 'fs/promises'

describe('SupervisorService', () => {
  let prisma: DeepMockProxy<PrismaClient>
  let supervisor: SupervisorService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ParserModule, JwtModule, EmitterModule, PrismaModule],
      providers: [SupervisorService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile()

    prisma = module.get<DeepMockProxy<PrismaClient>>(PrismaService)
    supervisor = module.get<SupervisorService>(SupervisorService)
  })

  it('should be defined', () => {
    expect(supervisor).toBeDefined()
  })

  it('create bulk tasks', async () => {
    await supervisor.createTasks(7, 7)
    await supervisor.createTasks(7, -7)
    await supervisor.createTasks(7)
    expect(prisma.task.create).toBeCalledTimes(28)
  })

  it('store result', async () => {
    const result = await readFile('./test/assets/apbd.html').then((f) =>
      f.toString()
    )
    prisma.task.findFirstOrThrow.mockResolvedValueOnce({
      id: 0,
      workerId: null,
      createdAt: new Date(),
      finalHash: 'None',
      initialHash: null,
      finishedAt: null,
      status: 'RUNNING',
      targetDate: new Date(),
    })
    prisma.taskResult.findFirst.mockResolvedValueOnce(null)
    prisma.taskResult.create.mockImplementationOnce(
      (args) =>
        new Promise((r) =>
          r({
            constantId: args.data.constantId,
            createdAt: new Date(),
            id: 1,
            object: args.data.object,
            taskId: args.data.taskId ?? 0,
          })
        )
    )
    await supervisor.storeTaskResult(0, 'None', [result])
  })
})
