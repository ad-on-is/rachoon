import { DateTime } from 'luxon'
import {
  Document as CommonDocument,
  DocumentData,
  DocumentStatus,
  DocumentType,
} from '@repo/common'
import { isPast } from 'date-fns'
import { Helpers, Document as Common } from '@repo/common'
import {
  beforeSave,
  BelongsTo,
  belongsTo,
  column,
  computed,
  HasMany,
  hasMany,
  hasOne,
  HasOne,
  afterFind,
  afterFetch,
} from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Organization from './Organization'
import HashIDs from 'App/Helpers/hashids'
import Template from './Template'
import BaseAppModel from './BaseAppModel'
import RecurringInvoice from './RecurringInvoice'

export default class Document extends BaseAppModel {
  public serializeExtras() {
    return {
      totalReminders: Number(this.$extras.totalReminders || 0),
    }
  }

  @afterFind()
  public static hydrate(model: Document) {
    const common = new Common(model.toJSON())
    model.data = Helpers.merge(common.data, model.data)
  }

  @afterFetch()
  public static hydrateAll(models: Document[]) {
    models.map((model) => {
      const common = new Common(model.toJSON())
      model.data = Helpers.merge(common.data, model.data)
    })
  }

  public totalReminders: number
  public static searchFields = ['number', 'data.dueDate', 'data.net', 'data.total']
  public static sortFields = ['number', 'status', 'data.dueDate', 'data.net', 'data.total']
  public static filterFields = ['clientId', 'offerId', 'invoiceId']

  @computed()
  public get overdue() {
    if (!this.data) {
      return false
    }

    return this.status === DocumentStatus.Pending && isPast(this.data.dueDate)
  }

  @computed()
  public get isFromRecurring() {
    return !!this.recurringId
  }

  @computed()
  public get isRecurring() {
    return !!this.recurringInvoice
  }

  @beforeSave()
  public static async calculate(document: Document) {
    const d = new CommonDocument(document.serialize())
    d.rebuild()
    document.data = d.data as DocumentData
  }
  @column({ isPrimary: true, serialize: (val) => HashIDs.encode(val) })
  public id: number

  @column()
  public number: string

  @column()
  public status: DocumentStatus

  @column()
  public sequence: number | null

  @column()
  public type: DocumentType

  @column()
  public data: DocumentData

  @column()
  public recurring: boolean

  @column()
  public recurringData: any

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column({ serialize: (val) => HashIDs.encode(val) })
  public clientId: number

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>

  @column({ serialize: (val) => HashIDs.encode(val) })
  public organizationId: number

  @column({ serialize: (val) => HashIDs.encode(val) })
  public templateId: number

  @column({ serialize: (val) => HashIDs.encode(val) })
  public invoiceId: number

  @column({ serialize: (val) => HashIDs.encode(val) })
  public recurringId: number

  @belongsTo(() => Organization)
  public organization: BelongsTo<typeof Organization>

  @hasOne(() => Template)
  public template: HasOne<typeof Template>

  @column()
  public offerId: number

  @belongsTo(() => Document, { foreignKey: 'offerId' })
  public offer: BelongsTo<typeof Document>

  @hasOne(() => RecurringInvoice, { foreignKey: 'invoiceId' })
  public recurringInvoice: HasOne<typeof RecurringInvoice>

  @belongsTo(() => Document, { foreignKey: 'invoiceId' })
  public overdueInvoice: BelongsTo<typeof Document>

  @hasMany(() => Document, { foreignKey: 'offerId' })
  public invoices: HasMany<typeof Document>

  @hasMany(() => Document, { foreignKey: 'invoiceId' })
  public reminders: HasMany<typeof Document>
}
