import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PasswordValidator, ProfileValidator } from 'App/Validators/User'

export default class ProfileController {
  public async index(ctx: HttpContextContract) {
    return ctx.auth.user
  }

  public async store(ctx: HttpContextContract) {
    if (ctx.request.qs()['pwOnly'] === 'true') {
      const body = await ctx.request.validate(PasswordValidator)
      await ctx.auth.user?.merge(body).save()
    } else {
      const body = await ctx.request.validate(new ProfileValidator(ctx))
      await ctx.auth.user?.merge(body).save()
    }
  }
}
