import { Settings } from '~~/models/settings'
import { SettingsData } from './settings'
import _ from 'lodash'

interface OrganizationData {
  info: {
    vat: string
    addition: string
  }
  address: {
    street: string
    zip: string
    city: string
    country: string
  }
  logo: string
  columns: {
    first: string
    second: string
    third: string
  }
}

type OrganizationType = {
  id: string
  name: string
  slug: string
  createdAt: Date
  updatedAt: Date
  data: OrganizationData
  settings: SettingsData
}

class Organization implements OrganizationType {
  id: string = ''
  createdAt: Date = new Date()
  updatedAt: Date = new Date()
  name: string = ''
  slug: string = ''
  data: OrganizationData = {
    address: { street: '', zip: '', city: '', country: '' },
    info: { vat: '', addition: '' },
    logo: '',
    columns: {
      first: '',
      second: '',
      third: '',
    },
  }
  settings: Settings = new Settings()

  constructor(json?: any) {
    if (json) {
      _.merge(this, json)
      this.settings = new Settings(this.settings)
    }
  }
}

export { Organization, OrganizationData, OrganizationType }
