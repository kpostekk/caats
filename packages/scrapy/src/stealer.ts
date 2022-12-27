import { createHash } from 'crypto'
import got from 'got'
import parse from 'node-html-parser'

export class Stealer {
  private emulatedStates: Record<string, string> = {}

  constructor(
    private readonly targetDate: string,
    private readonly lastResultHash?: string
  ) {}

  async steal() {
    const initial = await got
      .get('https://planzajec.pjwstk.edu.pl/PlanOgolny3.aspx')
      .text()

    this.updateEmulatedStatesFromHTML(initial)

    // set date
    const response = await got
      .post('https://planzajec.pjwstk.edu.pl/PlanOgolny3.aspx', {
        headers: {
          'X-MicrosoftAjax': 'Delta=true',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        },
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

    const dateHash = createHash('sha1').update(response).digest('hex')

    const ids = Array.from(new Set(response.match(/\d+;z/g)))

    this.updateEmulatedStatesFromDeltaFragments(response)

    // get items
    for (const id of ids) {
      const detailsResponse = await got
        .post('https://planzajec.pjwstk.edu.pl/PlanOgolny3.aspx', {
          headers: {
            'X-MicrosoftAjax': 'Delta=true',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
          },
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

      //console.log(detailsResponse.split('|')[7])
    }
  }

  private updateEmulatedStatesFromHTML(body: string) {
    const doc = parse(body)
    for (const x of doc
      .querySelectorAll('input')
      .filter((d) => d.attrs.name.startsWith('__'))) {
      this.emulatedStates[x.attrs.name] = x.attrs.value
    }
    console.log(this.emulatedStates)
  }

  private updateEmulatedStatesFromDeltaFragments(body: string) {
    const elements = body.split('|')
    const targets = elements.filter((e) => e.startsWith('__'))

    for (const key of targets) {
      this.emulatedStates[key] = elements[elements.indexOf(key) + 1]
    }
  }
}
