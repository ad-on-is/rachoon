import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { getCountryCode } from '@repo/common'
import Client from 'App/Models/Client'
import Organization from 'App/Models/Organization'
export default class extends BaseSeeder {
  public async run() {
    const clients = await Client.query()
    await Promise.all(
      clients.map(async (i) => {
        if (i.data.address) {
          const code = getCountryCode(i.data.address.country)
          if (code) {
            i.data.address.country = getCountryCode(i.data.address.country)
            await i.save()
          }
        }
      })
    )
    const orgs = await Organization.query()
    await Promise.all(
      orgs.map(async (i) => {
        if (i.data.address) {
          const code = getCountryCode(i.data.address.country)
          if (code) {
            i.data.address.country = getCountryCode(i.data.address.country)
            await i.save()
          }
        }
      })
    )
  }
}
