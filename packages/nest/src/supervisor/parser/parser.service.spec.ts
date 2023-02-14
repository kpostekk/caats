import { Test, TestingModule } from '@nestjs/testing'
import { readFile, readdir as readDir } from 'fs/promises'
import path from 'path'
import { ParserModule } from './parser.module'
import { ParserService } from './parser.service'

describe('ParserService', () => {
  let parser: ParserService
  let sources: string[]
  let convertedObjects: Record<
    string,
    {
      humanKey: string
      value?: string
    }
  >[]

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

  it('load html files', async () => {
    const assetsPath = './test/assets'
    const assets = await readDir('./test/assets').then((f) =>
      f.filter((x) => x.match(/^.+[.]html$/))
    )
    const htmlFiles = assets.map((f) => path.join(assetsPath, f))
    sources = await Promise.all(
      htmlFiles.map((p) => readFile(p).then((c) => c.toString()))
    )
  })

  it('convert html content into objects', () => {
    convertedObjects = sources.map((s) => parser.htmlToRawObject(s))
  })

  it('parse generic events', () => {
    for (const co of convertedObjects) {
      if (co.ctl06_TypRezerwacjiLabel) continue

      const result = parser.convertRawObjectToEvent(-1, co)

      expect(result).toBeDefined()
    }
  })

  it('parse exam events', () => {
    for (const co of convertedObjects) {
      if (
        !co.ctl06_TypRezerwacjiLabel ||
        co.ctl06_TypRezerwacjiLabel.value !== 'egzamin'
      )
        continue

      const result = parser.convertRawObjectReservationToEvent(-1, co)

      expect(result).toBeDefined()
    }
  })
})
