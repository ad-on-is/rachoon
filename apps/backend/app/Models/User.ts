import Project from 'App/Models/Project'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  belongsTo,
  BelongsTo,
  manyToMany,
  ManyToMany,
  hasMany,
  HasMany,
  computed,
} from '@ioc:Adonis/Lucid/Orm'
import Organization from './Organization'
import HashIDs from 'App/Helpers/hashids'
import TimeTrack from './TimeTrack'

export default class User extends compose(BaseModel, SoftDeletes) {
  public serializeExtras() {
    return {
      minutes: Number(this.$extras.minutes || 0),
    }
  }

  @column({ isPrimary: true, serialize: (val) => HashIDs.encode(val) })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public role: string

  @column()
  public rememberMeToken?: string

  @column()
  public data: any

  @column()
  public settings: any

  @column({ serialize: (val) => HashIDs.encode(val) })
  public organizationId: number

  @belongsTo(() => Organization)
  public organization: BelongsTo<typeof Organization>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(User: User) {
    if (User.$dirty.password) {
      User.password = await Hash.make(User.password)
    }
    if (!User.data.username) {
      User.data.username = User.data.fullName.replace(' ', '').toLowerCase()
    }
  }

  @computed()
  public get isAdmin() {
    return this.role === 'admin'
  }

  @manyToMany(() => Project, { pivotTable: 'user_projects' })
  public projects: ManyToMany<typeof Project>

  @hasMany(() => TimeTrack)
  public timeTracks: HasMany<typeof TimeTrack>
}
