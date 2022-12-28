import { Injectable, Logger } from '@nestjs/common'
import parse from 'node-html-parser'

@Injectable()
export class ParserService {
  htmlToObject(html: string) {
    const document = parse(html)

    const dataRows = document.querySelectorAll('tr')

    const result: Record<string, { humanKey: string; value?: string }> = {}

    for (const row of dataRows) {
      const [key, value] = row.querySelectorAll('td')
      const safeKey = value.querySelector('span').id
      const humanKey = key.text.trim()
      const safeValue = value.text.trim()
      result[safeKey] = {
        humanKey,
        value: safeValue,
      }
    }

    return result
  }
}
