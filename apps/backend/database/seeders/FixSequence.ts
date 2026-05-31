import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { DocumentType } from '@repo/common'
import Client from 'App/Models/Client'
import Document from 'App/Models/Document'
import Organization from 'App/Models/Organization'

function extractNumber(template: string, input: string): number | null {
  const regexStr = template
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\\\{number\\\}/g, '(\\d+)')
    .replace(/\\\{date:[^}]+\\\}/g, '[\\d]+')

  const match = input.match(new RegExp(`^${regexStr}$`))
  return match ? parseInt(match[1], 10) : null
}
export default class extends BaseSeeder {
  public async run() {
    const orgs = await Organization.query()
    for (const org of orgs) {
      const docs = await Document.query().where('organization_id', org.id).withTrashed()
      const invoiceFormat = org.settings.invoices.number.format
      const offerFormat = org.settings.offers.number.format
      const reminderFormat = org.settings.reminders.number.format
      for (const doc of docs) {
        if (
          doc.type != DocumentType.Invoice &&
          doc.type != DocumentType.Offer &&
          doc.type != DocumentType.Reminder
        ) {
          continue
        }
        const format =
          doc.type === DocumentType.Invoice
            ? invoiceFormat
            : doc.type === DocumentType.Offer
            ? offerFormat
            : reminderFormat

        const number = extractNumber(format, doc.number)
        console.log(format, doc.number, number)
        doc.sequence = number
        await doc.save()
      }
      const clients = await Client.query().where('organization_id', org.id).withTrashed()
      const clientFormat = org.settings.clients.number.format
      for (const client of clients) {
        const number = extractNumber(clientFormat, client.number)
        console.log(clientFormat, client.number, number)
        client.sequence = number
        await client.save()
      }
    }
  }
}
