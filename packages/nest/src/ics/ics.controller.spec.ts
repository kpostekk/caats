import { Test, TestingModule } from '@nestjs/testing'
import { IcsController } from './ics.controller'

describe('IcsController', () => {
  let controller: IcsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IcsController],
    }).compile()

    controller = module.get<IcsController>(IcsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
