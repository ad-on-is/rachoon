import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OrganizationValidator from 'App/Validators/Organization'

export default class SettingsController {
  public async store(ctx: HttpContextContract) {
    const body = await ctx.request.validate(new OrganizationValidator(ctx))
    return ctx.auth.user?.organization.merge(body).save()
  }
}
