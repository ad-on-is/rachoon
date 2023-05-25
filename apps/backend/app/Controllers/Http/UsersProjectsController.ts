import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Project from 'App/Models/Project'
import User from 'App/Models/User'

export default class ProjectsController {
  public async index(ctx: HttpContextContract) {
    return await (
      await User.query()
        .where({ id: ctx.request.param('user_id'), organizationId: ctx.auth.user?.organization.id })
        .firstOrFail()
    )
      .related('projects')
      .query()
      .withAggregate('timeTracks', (query) =>
        query
          .where({ userId: ctx.request.param('user_id') })
          .sum(Database.knexRawQuery(`(data->>'minutes')::int`))
          .as('minutes')
      )
  }
  public async update(ctx: HttpContextContract) {
    const user = await User.query()
      .where({ id: ctx.request.param('user_id'), organizationId: ctx.auth.user?.organization.id })
      .firstOrFail()

    const project = await Project.query()
      .where({
        id: ctx.request.param('id'),
        organizationId: ctx.auth.user?.organization.id,
      })
      .firstOrFail()

    return await user.related('projects').attach([project.id])
  }

  public async destroy(ctx: HttpContextContract) {
    return await (
      await User.query()
        .where({ id: ctx.request.param('user_id'), organizationId: ctx.auth.user?.organization.id })
        .firstOrFail()
    )
      .related('projects')
      .detach([ctx.request.param('id')])
  }
}
