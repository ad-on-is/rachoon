import { DateTime } from 'luxon'
import {
  column,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany,
  afterFetch,
  afterFind,
} from '@ioc:Adonis/Lucid/Orm'
import Organization from './Organization'
import HashIDs from 'App/Helpers/hashids'
import Document from './Document'
import BaseAppModel from './BaseAppModel'
import { DocumentType, Helpers, Client as Common } from '@repo/common'

export default class Client extends BaseAppModel {
  public static searchFields = ['name', 'number']
  public static sortFields = ['name', 'number', 'totalInvoices', 'totalReminders', 'totalOffers']
  public serializeExtras() {
    return {
      totalInvoices: Number(this.$extras.totalInvoices || 0),
      pendingInvoices: Number(this.$extras.pendingInvoices || 0),
      totalOffers: Number(this.$extras.totalOffers || 0),
      pendingOffers: Number(this.$extras.pendingOffers || 0),
      invoicesTotal: Number(this.$extras.invoicesTotal || 0),
      totalReminders: Number(this.$extras.totalReminders || 0),
    }
  }

  @afterFind()
  public static hydrate(model: Client) {
    const common = new Common(model.toJSON())
    model.data = Helpers.merge(common.data, model.data)
  }

  @afterFetch()
  public static hydrateAll(models: Client[]) {
    models.map((model) => {
      const common = new Common(model.toJSON())
      model.data = Helpers.merge(common.data, model.data)
    })
  }

  public totalInvoices: number
  public totalOrders: number
  public totalReminders: number
  public total: number
  public net: number
  @column({ isPrimary: true, serialize: (val) => HashIDs.encode(val) })
  public id: number

  @column()
  public name: string

  @column()
  public number: string

  @column()
  public data: any

  @column({ serialize: (val) => HashIDs.encode(val) })
  public organizationId: number

  @belongsTo(() => Organization)
  public organization: BelongsTo<typeof Organization>

  @hasMany(() => Document, {
    onQuery: (query) => {
      return query.where({ type: DocumentType.Invoice }).andWhereNull('deletedAt')
    },
  })
  public invoices: HasMany<typeof Document>

  @hasMany(() => Document, {
    onQuery: (query) => {
      return query.where({ type: DocumentType.Offer }).andWhereNull('deletedAt')
    },
  })
  public offers: HasMany<typeof Document>

  @hasMany(() => Document, {
    onQuery: (query) => {
      return query.where({ type: DocumentType.Reminder }).andWhereNull('deletedAt')
    },
  })
  public reminders: HasMany<typeof Document>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
