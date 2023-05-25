import * as dateFns from 'date-fns'
import { TaxOption, TaxRate } from './invoiceOrOffer'
import _ from 'lodash'
interface SettingsData {
  general: {
    currency: string
    locale: string
  }
  style: {
    colors: {
      primary: string
      secondary: string
      bodyText: string
      border: string
      headerBackground: string
      headerText: string
      footerBackground: string
      footerText: string
      tableEvenBackground: string
      tableOddBackground: string
    }
    template: string
  }
  units: Array<{ title: string; default: boolean }>
  invoices: {
    number: {
      format: String
      start: number
      padZeros: number
    }
    dueDays: number
  }
  offers: {
    number: {
      format: String
      start: number
      padZeros: number
    }
    dueDays: number
  }
  clients: {
    number: {
      format: String
      start: number
      padZeros: number
    }
  }
  taxes: {
    rates: Array<TaxRate>
    options: Array<TaxOption>
  }
}

class Settings implements SettingsData {
  general = {
    currency: 'USD',
    locale: 'en-US',
  }
  style = {
    colors: {
      primary: '#7287fd',
      secondary: '#dc8a78',
      bodyText: '#1e1e2e',
      border: '#e6e9ef',
      headerBackground: '#e6e9ef',
      headerText: '#1e1e2e',
      footerBackground: '#1e1e2e',
      footerText: '#cdd6f4',
      tableEvenBackground: '#e6e9ef',
      tableOddBackground: '#ffffff',
    },
    template: '',
  }
  invoices = {
    number: {
      format: 'INV-{number}{date:yyMMdd}',
      start: 0,
      padZeros: 3,
    },
    dueDays: 30,
  }
  offers = {
    number: {
      format: 'OFF-{number}{date:yyMMdd}',
      start: 0,
      padZeros: 3,
    },
    dueDays: 30,
  }
  clients = {
    number: {
      format: 'CLI-{number}{date:yyMMdd}',
      start: 0,
      padZeros: 3,
    },
  }

  units = [
    { title: 'hours', default: true },
    { title: 'days', default: false },
  ]

  taxes = {
    rates: [
      { rate: 10, default: false },
      { rate: 20, default: true },
    ],
    options: [
      { title: 'Apply Taxes', applicable: true, default: true },
      { title: 'Reverse Charge', applicable: false, default: false },
    ],
  }

  constructor(json?: any) {
    if (json) {
      _.merge(this, json)
    }
  }

  public setDefaultRate(index: number) {
    this.taxes.rates.map((r) => (r.default = false))
    this.taxes.rates[index].default = true
  }

  public setDefaultUnit(index: number) {
    this.units.map((u) => (u.default = false))
    this.units[index].default = true
  }

  public setDefaultOption(index: number) {
    this.taxes.options.map((o) => (o.default = false))
    this.taxes.options[index].default = true
  }

  public removeTaxRate(index: number) {
    this.taxes.rates.splice(index, 1)
  }
  public removeUnit(index: number) {
    this.units.splice(index, 1)
  }
  public removeTaxOption(index: number) {
    this.taxes.options.splice(index, 1)
  }
  public addTaxRate() {
    this.taxes.rates.push({ rate: null, default: false })
  }
  public addUnit() {
    this.units.push({ title: '', default: false })
  }
  public addTaxOption() {
    this.taxes.options.push({ title: '', default: false, applicable: true })
  }
  public numberFormat(entity: string, add: number = 0) {
    const number = String(Number(this[entity].number.start) + add).padStart(this[entity].number.padZeros, '0')

    let final = this[entity].number.format.replaceAll('{number}', number)
    const d = final.match(/\{date:[a-zA-Z_\-\.]+\}/)
    if (d) {
      const format = d[0].replace('{date:', '').replace('}', '')
      try {
        const date = dateFns.format(new Date(), format)
        final = final.replace(d[0], date)
      } catch (e) {
        final = final.replace(d[0], 'INVALID-DATEFORMAT')
      }
    }
    return final
  }
}

export { Settings, SettingsData }
