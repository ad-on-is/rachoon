import { DocumentType } from '@repo/common'
import { Format } from '@repo/common'
import Client from 'App/Models/Client'
import Document from 'App/Models/Document'
import Organization from 'App/Models/Organization'

export default class NumberService {
  public static async document(
    organizationId: number,
    type: DocumentType
  ): Promise<[string, number]> {
    const last = await Document.query()
      .where({
        organizationId: organizationId,
        type: type,
      })
      .andWhere('sequence', '>', 0)
      .orderBy('sequence', 'desc')
      .withTrashed()
      .first()

    let sequence = last?.sequence || 0

    const organization = await Organization.findOrFail(organizationId)

    let documentNumber: any
    switch (type) {
      case DocumentType.Invoice:
        documentNumber = organization.settings.invoices.number
        sequence = sequence > 0 ? sequence : organization.settings.invoices.number.start
        break
      case DocumentType.Offer:
        documentNumber = organization.settings.offers.number
        sequence = sequence > 0 ? sequence : organization.settings.offers.number.start
        break
      case DocumentType.Reminder:
        documentNumber = organization.settings.reminders.number
        sequence = sequence > 0 ? sequence : organization.settings.reminders.number.start
        break
      default:
        throw new Error('Type must be invoice, offer or reminder')
    }

    sequence += 1

    return [Format.number(documentNumber, sequence), sequence]
  }

  public static async client(organizationId: number): Promise<[string, number]> {
    const organization = await Organization.findOrFail(organizationId)

    const last = await Client.query()
      .where({
        organizationId: organization.id,
      })
      .andWhere('sequence', '>', 0)
      .withTrashed()
      .orderBy('sequence', 'desc')
      .first()

    let sequence = last?.sequence || 0
    sequence = sequence > 0 ? sequence : organization.settings.clients.number.start
    sequence += 1

    return [Format.number(organization.settings.clients.number, sequence), sequence]
  }
}
