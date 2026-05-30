import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  belongsTo,
  BelongsTo,
  computed,
  afterFind,
  afterFetch,
} from '@ioc:Adonis/Lucid/Orm'
import Organization from './Organization'
import HashIDs from 'App/Helpers/hashids'
import BaseAppModel from './BaseAppModel'
import { UserRole, Helpers, User as Common } from '@repo/common'

export default class User extends BaseAppModel {
  public serializeExtras() {
    return {
      minutes: Number(this.$extras.minutes || 0),
    }
  }

  @afterFind()
  public static hydrate(model: User) {
    const common = new Common(model.toJSON())
    model.data = Helpers.merge(common.data, model.data)
  }

  @afterFetch()
  public static hydrateAll(models: User[]) {
    models.map((model) => {
      const common = new Common(model.toJSON())
      model.data = Helpers.merge(common.data, model.data)
    })
  }

  public static searchFields = ['email', 'data.fullName', 'data.username']
  public static sortFields = ['email', 'role', 'data.fullName', 'data.username']

  @column({ isPrimary: true, serialize: (val) => HashIDs.encode(val) })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public role: UserRole

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
    return this.role === UserRole.ADMIN
  }
}
