import { createHash } from 'crypto'
import got from 'got'
import parse from 'node-html-parser'

function createChunks<T>(elements: T[], idealSize: number): T[][] {
  const result: T[][] = []
  let currentChunk: T[] = []
  for (const element of elements) {
    currentChunk.push(element)
    if (currentChunk.length === idealSize) {
      result.push(currentChunk)
      currentChunk = []
    }
  }
  if (currentChunk.length > 0) result.push(currentChunk)

  return result
}

export class Stealer {
  private readonly emulatedStates: Record<string, string> = {}
  private readonly got = got.extend({
    headers: {
      'X-MicrosoftAjax': 'Delta=true',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    },
  })
  private progress = 0
  private targetSize = 0

  constructor(
    private readonly targetDate: string,
    private readonly lastResultHash?: string,
    private readonly maxRequestRate: number = 10
  ) {}

  async steal() {
    this.progress = 0
    let pageBody: string = await this.loadInitialPage()

    if (this.checkDate(pageBody)) {
      console.log('Changing date...')
      const rawBody = await this.changeDate()
      pageBody = parse(rawBody).removeWhitespace().toString() // sanitization
    } else {
      console.log('Date is already set.')
      const body = parse(pageBody).getElementById('RadAjaxPanel1')
      pageBody = body.removeWhitespace().toString() // sanitization
    }

    const dateHash = createHash('sha1').update(pageBody).digest('hex')
    console.log({ targetDate: this.targetDate, dateHash })

    if (dateHash === this.lastResultHash) {
      console.warn('No changes detected. Skipping...')
      return null
    }

    const ids = Array.from(new Set(pageBody.match(/\d+;z/g)))
    this.targetSize = ids.length

    const chunks = createChunks(ids, this.maxRequestRate)
    const result: string[] = []

    for (const chunk of chunks) {
      const detailsPromises = chunk.map((id) => this.getDetails(id))
      const [details] = await Promise.all([
        Promise.all(detailsPromises),
        new Promise((r) => setTimeout(r, 1000)),
      ])
      result.push(...details)
    }

    return { result, hash: dateHash }
  }

  private updateEmulatedStatesFromHTML(body: string) {
    const doc = parse(body)
    for (const x of doc
      .querySelectorAll('input')
      .filter((d) => d.attrs.name.startsWith('__'))) {
      this.emulatedStates[x.attrs.name] = x.attrs.value
    }
  }

  private updateEmulatedStatesFromDeltaFragments(body: string) {
    const elements = body.split('|')
    const targets = elements.filter((e) => e.startsWith('__'))

    for (const key of targets) {
      this.emulatedStates[key] = elements[elements.indexOf(key) + 1]
    }
  }

  private async loadInitialPage() {
    const body = await this.got
      .get('https://planzajec.pjwstk.edu.pl/PlanOgolny3.aspx')
      .text()
    this.updateEmulatedStatesFromHTML(body)
    return body
  }

  /**
   * Checks if date change can be done.
   */
  private checkDate(body: string) {
    const doc = parse(body)
    const dateInputValue = doc.getElementById('DataPicker_dateInput')?.attrs
      .value
    return dateInputValue !== this.targetDate
  }

  private async changeDate() {
    const body = await this.got
      .post('https://planzajec.pjwstk.edu.pl/PlanOgolny3.aspx', {
        form: {
          RadScriptManager1: 'RadAjaxPanel1Panel|DataPicker',
          __EVENTTARGET: 'DataPicker',
          __EVENTARGUMENT: '',
          ...this.emulatedStates,
          DataPicker: this.targetDate,
          DataPicker$dateInput: this.targetDate,
          DataPicker_ClientState: '',
          DataPicker_dateInput_ClientState: `{"enabled":true,"emptyMessage":"","validationText":"${this.targetDate}-00-00-00","valueAsString":"${this.targetDate}-00-00-00","minDateStr":"1980-01-01-00-00-00","maxDateStr":"2099-12-31-00-00-00","lastSetTextBoxValue":"${this.targetDate}"}`,
          __ASYNCPOST: 'true',
          RadAJAXControlID: 'RadAjaxPanel1',
        },
      })
      .text()
    this.updateEmulatedStatesFromDeltaFragments(body)
    return body.split('|')[7]
  }

  private async getDetails(id: string) {
    const details = await this.got
      .post('https://planzajec.pjwstk.edu.pl/PlanOgolny3.aspx', {
        form: {
          RadScriptManager1:
            'RadToolTipManager1RTMPanel|RadToolTipManager1RTMPanel',
          __EVENTTARGET: 'RadToolTipManager1RTMPanel',
          __EVENTARGUMENT: '',
          ...this.emulatedStates,
          RadToolTipManager1_ClientState:
            '{"AjaxTargetControl":"{html_id}","Value":"{html_id}"}'.replaceAll(
              '{html_id}',
              id
            ),
        },
      })
      .text()
    this.updateEmulatedStatesFromDeltaFragments(details)

    const rawBody = details.split('|')[7]
    const cleanBody = parse(rawBody).removeWhitespace().toString()

    console.log(
      'Progress:',
      ++this.progress,
      '/',
      this.targetSize,
      `(${((this.progress / this.targetSize) * 100).toFixed(2)}%)`
    )

    return cleanBody
  }
}
