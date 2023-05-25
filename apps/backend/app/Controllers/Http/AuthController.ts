import HashIDs from 'App/Helpers/hashids'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OrganizationHelper from 'App/Helpers/organization'
import User from 'App/Models/User'

export default class AuthController {
  public async store(ctx: HttpContextContract) {
    const email = ctx.request.input('email')
    const password = ctx.request.input('password')
    const user = await User.query()
      .where({
        email: email,
        organizationId: HashIDs.decode((await OrganizationHelper.getFromOrigin(ctx)).id!),
      })
      .first()

    if (!user) {
      return ctx.response.notAcceptable('No user in that organization')
    }

    return await ctx.auth.use('api').attempt(email, password)
  }

  public async destroy(ctx: HttpContextContract) {
    return await ctx.auth.logout()
  }
}
