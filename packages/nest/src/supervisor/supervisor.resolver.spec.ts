import { Test, TestingModule } from '@nestjs/testing'
import { SupervisorResolver } from './supervisor.resolver'

describe('SupervisorResolver', () => {
  let resolver: SupervisorResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupervisorResolver],
    }).compile()

    resolver = module.get<SupervisorResolver>(SupervisorResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
