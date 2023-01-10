import { Test, TestingModule } from '@nestjs/testing'
import { IcsResolver } from './ics.resolver'

describe('IcsResolver', () => {
  let resolver: IcsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IcsResolver],
    }).compile()

    resolver = module.get<IcsResolver>(IcsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
