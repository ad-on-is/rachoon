import { compose } from '@ioc:Adonis/Core/Helpers'
import TimeTrack from 'App/Models/TimeTrack'
import Client from 'App/Models/Client'
import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import HashIDs from '../Helpers/hashids'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import User from './User'

export default class Project extends compose(BaseModel, SoftDeletes) {
  public serializeExtras() {
    return {
      minutes: Number(this.$extras.minutes || 0),
    }
  }
  @column({ isPrimary: true, serialize: (val) => HashIDs.encode(val) })
  public id: number

  @column({ serialize: (val) => HashIDs.encode(val) })
  public clientId: number

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>

  @column({ serialize: (val) => HashIDs.encode(val) })
  public organizationId: number

  @column()
  public number: string

  @column()
  public data: any

  @hasMany(() => TimeTrack)
  public timeTracks: HasMany<typeof TimeTrack>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => User, { pivotTable: 'user_projects' })
  public users: ManyToMany<typeof User>
}
