import Database from '@ioc:Adonis/Lucid/Database'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'
import ProjectValidator from 'App/Validators/Project'

export default class ProjectsController {
  public async index(ctx: HttpContextContract) {
    return await Project.query()
      .where({
        organizationId: ctx.auth.user?.organizationId,
        clientId: ctx.request.param('client_id'),
      })
      .withAggregate('timeTracks', (query) =>
        query.sum(Database.knexRawQuery(`(data->>'minutes')::int`)).as('minutes')
      )
      .orderBy('created_at', 'desc')
  }

  public async store(ctx: HttpContextContract) {
    const body = await ctx.request.validate(new ProjectValidator(ctx))
    const p = await Project.create({
      ...body,
      organizationId: ctx.auth.user?.organizationId,
      clientId: ctx.request.param('client_id'),
    })
    return await Project.query()
      .where({ id: p.id })
      .withAggregate('timeTracks', (query) =>
        query.sum(Database.knexRawQuery(`(data->>'minutes')::int`)).as('minutes')
      )
      .first()
  }
}
