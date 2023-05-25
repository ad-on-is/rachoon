import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import { UserValidator } from 'App/Validators/User'

export default class UsersController {
  public async index(ctx: HttpContextContract) {
    return User.query()
      .where({ organizationId: ctx.auth.user?.organization.id })
      .withAggregate('timeTracks', (query) =>
        query.sum(Database.knexRawQuery(`(data->>'minutes')::int`)).as('minutes')
      )
  }

  public async show(ctx: HttpContextContract) {
    return await User.query()
      .where({
        id: ctx.request.param('id'),
        organizationId: ctx.auth.user?.organization.id,
      })
      .firstOrFail()
  }

  public async store(ctx: HttpContextContract) {
    const body = await ctx.request.validate(UserValidator)
    return await User.create({ ...body, organizationId: ctx.auth.user?.organization.id })
  }

  public async update(ctx: HttpContextContract) {
    const body = await ctx.request.validate(UserValidator)
    await User.updateOrCreate(
      {
        organizationId: ctx.auth.user?.organization.id,
        id: ctx.request.param('id'),
      },
      body
    )
  }

  public async destroy(ctx: HttpContextContract) {
    return await (
      await User.query()
        .where({
          organizationId: ctx.auth.user?.organization.id,
          id: ctx.request.param('id'),
        })
        .firstOrFail()
    ).delete()
  }
}
