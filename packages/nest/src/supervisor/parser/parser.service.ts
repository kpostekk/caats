import { Injectable } from '@nestjs/common'
import { DateTime } from 'luxon'
import parse from 'node-html-parser'

@Injectable()
export class ParserService {
  htmlToRawObject(html: string) {
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

  convertRawObjectToEvent(
    sourceId: number,
    sourceHash: string,
    rawObject: Record<string, { value?: string; humanKey: string }>
  ) {
    const {
      ctl06_DataZajecLabel: date,
      ctl06_GodzRozpLabel: timeStart,
      ctl06_GodzZakonLabel: timeEnd,
      ctl06_DydaktycyLabel: hostsString,
      ctl06_SalaLabel: room,
      ctl06_TypZajecLabel: type,
      ctl06_KodPrzedmiotuLabel: code,
      ctl06_NazwaPrzedmiotyLabel: name,
      ctl06_GrupyLabel: groupsString,
    } = rawObject

    const startsAt = this.combineStringsToDateTime(
      timeStart.value,
      date.value
    ).toJSDate()
    const endsAt = this.combineStringsToDateTime(
      timeEnd.value,
      date.value
    ).toJSDate()

    return {
      constantId: sourceHash,
      code: code.value,
      name: name.value,
      room: room?.value,
      groups: groupsString?.value.split(', '),
      hosts: hostsString?.value.split(', ').filter((h) => h !== '---'),
      type: type.value,
      startsAt,
      endsAt,
      sourceId,
    }
  }

  private combineStringsToDateTime(timeRaw: string, dateRaw: string): DateTime {
    return DateTime.fromFormat(`${dateRaw} ${timeRaw}`, 'dd.MM.yyyy HH:mm:ss', {
      zone: 'Europe/Warsaw',
    })
  }
}
