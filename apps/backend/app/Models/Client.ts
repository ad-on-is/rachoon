import TimeTrack from 'App/Models/TimeTrack'
import { DateTime } from 'luxon'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { column, BaseModel, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Organization from './Organization'
import HashIDs from '../Helpers/hashids'
import InvoiceOrOffer from './InvoiceOrOffer'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import Project from './Project'

export default class Client extends compose(BaseModel, SoftDeletes) {
  public serializeExtras() {
    return {
      totalInvoices: Number(this.$extras.totalInvoices || 0),
      pendingInvoices: Number(this.$extras.pendingInvoices || 0),
      totalOffers: Number(this.$extras.totalOffers || 0),
      pendingOffers: Number(this.$extras.pendingOffers || 0),
      invoicesTotal: Number(this.$extras.invoicesTotal || 0),
      minutes: Number(this.$extras.minutes || 0),
      totalProjects: Number(this.$extras.totalProjects || 0),
    }
  }
  public totalInvoices: number
  public totalOrders: number
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

  @hasMany(() => InvoiceOrOffer, {
    onQuery: (query) => {
      return query.where({ type: 'invoice' })
    },
  })
  public invoices: HasMany<typeof InvoiceOrOffer>

  @hasMany(() => InvoiceOrOffer, {
    onQuery: (query) => {
      return query.where({ type: 'offer' })
    },
  })
  public offers: HasMany<typeof InvoiceOrOffer>

  @hasMany(() => TimeTrack, {})
  public timeTracks: HasMany<typeof TimeTrack>
  @hasMany(() => Project, {})
  public projects: HasMany<typeof Project>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
