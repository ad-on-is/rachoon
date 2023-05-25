import { compose } from '@ioc:Adonis/Core/Helpers'
import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Organization from './Organization'
import HashIDs from 'App/Helpers/hashids'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'

export default class InvoiceOrOffer extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true, serialize: (val) => HashIDs.encode(val) })
  public id: number

  @column()
  public number: string

  @column()
  public status: string

  @column()
  public type: string

  @column()
  public data: any

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

  @belongsTo(() => Organization)
  public organization: BelongsTo<typeof Organization>

  @column()
  public offerId: number

  @belongsTo(() => InvoiceOrOffer, { foreignKey: 'offerId' })
  public offer: BelongsTo<typeof InvoiceOrOffer>

  @hasMany(() => InvoiceOrOffer, { foreignKey: 'offerId' })
  public invoices: HasMany<typeof InvoiceOrOffer>
}
