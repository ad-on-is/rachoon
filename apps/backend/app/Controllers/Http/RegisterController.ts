import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Organization from 'App/Models/Organization'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/Register'

export default class RegisterController {
  public async store(ctx: HttpContextContract) {
    const body = await ctx.request.validate(RegisterValidator)
    const organization = await Organization.create({
      name: body.organization.name,
      slug: body.organization.slug,
    })
    return await User.create({
      email: body.user.email,
      password: body.user.password,
      role: 'admin',
      organizationId: organization.id,
      data: body.user.data,
    })
  }
}
