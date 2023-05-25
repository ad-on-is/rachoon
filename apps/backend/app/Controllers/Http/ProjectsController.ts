import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'

export default class ProjectsController {
  public async index(ctx: HttpContextContract) {
    if (ctx.request.qs()['count']) {
      return await Project.query()
        .where({ organizationId: ctx.auth.user?.organizationId })
        .getCount()
    }

    if (!ctx.auth.user?.isAdmin) {
      return ctx.auth.user?.related('projects').query().preload('client')
    }

    return await Project.query()
      .where({ organizationId: ctx.auth.user?.organizationId })
      .preload('client')
  }

  public async destroy(ctx: HttpContextContract) {
    return (
      await Project.query()
        .where({
          organizationId: ctx.auth.user?.organization.id,
          id: ctx.request.param('id'),
        })
        .firstOrFail()
    ).delete()
  }
}
