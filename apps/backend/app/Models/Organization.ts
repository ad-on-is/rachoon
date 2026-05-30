import { DateTime } from 'luxon'
import { column, hasMany, HasMany, afterFetch, afterFind } from '@ioc:Adonis/Lucid/Orm'
import Document from './Document'
import Client from './Client'
import User from './User'
import HashIDs from 'App/Helpers/hashids'
import BaseAppModel from './BaseAppModel'
import { Helpers, OrganizationData, Settings, Organization as Common } from '@repo/common'
import _ from 'lodash'

export default class Organization extends BaseAppModel {
  @column({ isPrimary: true, serialize: (val) => HashIDs.encode(val) })
  public id: number

  @afterFind()
  public static hydrate(model: Organization) {
    const common = new Common(model.toJSON())
    model.data = Helpers.merge(common.data, model.data)
    model.settings = Helpers.merge(common.settings, model.settings)
  }

  @afterFetch()
  public static hydrateAll(models: Organization[]) {
    models.map((model) => {
      const common = new Common(model.toJSON())
      model.data = Helpers.merge(common.data, model.data)
      model.settings = Helpers.merge(common.settings, model.settings)
    })
  }

  @column()
  public name: string

  @column()
  public slug: string

  @column()
  public data: OrganizationData

  @column()
  public settings: Settings

  @hasMany(() => Document)
  public documents: HasMany<typeof Document>
  @hasMany(() => Client)
  public clients: HasMany<typeof Client>

  @hasMany(() => User)
  public users: HasMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
