import { DateTime } from 'luxon'
import { column, belongsTo, BelongsTo, afterFind, afterFetch } from '@ioc:Adonis/Lucid/Orm'
import Organization from './Organization'
import HashIDs from '../Helpers/hashids'
import BaseAppModel from './BaseAppModel'
import { Helpers, Template as Common } from '@repo/common'

export default class Template extends BaseAppModel {
  public serializeExtras() {
    return {
      isGlobal: this.organizationId === null,
    }
  }

  @afterFind()
  public static hydrate(model: Template) {
    const common = new Common(model.toJSON())
    model.data = Helpers.merge(common.data, model.data)
  }

  @afterFetch()
  public static hydrateAll(models: Template[]) {
    models.map((model) => {
      const common = new Common(model.toJSON())
      model.data = Helpers.merge(common.data, model.data)
    })
  }

  public static searchFields = ['title']
  public static sortFields = ['title']
  public isGlobal: boolean

  @column({ isPrimary: true, serialize: (val) => HashIDs.encode(val) })
  public id: number

  @column()
  public title: string

  @column()
  public default: boolean

  @column()
  public premium: boolean

  @column()
  public data: any

  @column()
  public html: string

  @column()
  public thumbnail: string

  @column({ serialize: (val) => HashIDs.encode(val) })
  public organizationId: number

  @belongsTo(() => Organization)
  public organization: BelongsTo<typeof Organization>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
