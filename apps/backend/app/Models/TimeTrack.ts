import { compose } from '@ioc:Adonis/Core/Helpers'
import Project from 'App/Models/Project'
import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import HashIDs from 'App/Helpers/hashids'
import User from './User'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'

export default class TimeTrack extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true, serialize: (val) => HashIDs.encode(val) })
  public id: number

  @column({ serialize: (val) => HashIDs.encode(val) })
  public projectId: number

  @column({ serialize: (val) => HashIDs.encode(val) })
  public clientId: number

  @belongsTo(() => Project)
  public project: BelongsTo<typeof Project>

  @column({ serialize: (val) => HashIDs.encode(val) })
  public organizationId: number

  @column({ serialize: (val) => HashIDs.encode(val) })
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public data: any

  @column.dateTime()
  public date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
