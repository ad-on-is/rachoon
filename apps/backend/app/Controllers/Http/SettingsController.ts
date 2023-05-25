import Organization from 'App/Models/Organization'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SettingsController {
  public async store(ctx: HttpContextContract) {
    return Organization.query()
      .where({ id: ctx.auth.user?.organization.id })
      .update({
        settings: ctx.request.body(),
      })
      .first()
  }
}
