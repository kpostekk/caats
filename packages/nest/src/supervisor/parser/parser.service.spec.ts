import { Test, TestingModule } from '@nestjs/testing'
import { readFile } from 'fs/promises'
import { ParserModule } from './parser.module'
import { ParserService } from './parser.service'

describe('ParserService', () => {
  let parser: ParserService
  let parseResult: Record<string, { value?: string; humanKey: string; }>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ParserModule],
      providers: [ParserService],
    }).compile()

    parser = module.get<ParserService>(ParserService)
  })

  it('should be defined', () => {
    expect(parser).toBeDefined()
  })

  it('parse example', async () => {
    parseResult = parser.htmlToRawObject(
      (await readFile('test/html/t1.html')).toString()
    )
    expect(parseResult).toBeDefined()
  })

  it('convert to event', () => {
    expect(parser.convertRawObjectToEvent(0, parseResult)).toBeDefined()
  })
})
