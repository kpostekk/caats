import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from './app.module'
import { AppResolver } from './app.resolver'

describe('AppResolver', () => {
  let resolver: AppResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [AppResolver],
    }).compile()

    resolver = module.get<AppResolver>(AppResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
