import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TimeTrack from 'App/Models/TimeTrack'
import TimeTrackValidator from 'App/Validators/TimeTrack'
import { DateTime } from 'luxon'

export default class TimeTracksController {
  public async index(ctx: HttpContextContract) {
    const start = ctx.request.qs()['startDate']
    const end = ctx.request.qs()['endDate']
    const clientId = ctx.request.qs()['clientId']

    return await TimeTrack.query()
      .where({ organizationId: ctx.auth.user?.organization.id })
      .preload('project', (query) =>
        query.preload('client', (query) => query.select(['id', 'number', 'name']))
      )
      .preload('user', (query) => query.select(['id', 'data']))
      .if(start, (query) => query.where('date', '>=', DateTime.fromISO(start).toSQL()))
      .if(end, (query) => query.where('date', '<=', DateTime.fromISO(end).toSQL()))
      .if(clientId, (query) => query.where({ clientId: clientId }))
      .orderBy('date', 'desc')
  }

  public async store(ctx: HttpContextContract) {
    const body = await ctx.request.validate(TimeTrackValidator)
    const newTimeTrack = await TimeTrack.create({
      ...body,
      organizationId: ctx.auth.user?.organizationId,
      projectId: ctx.request.param('project_id'),
      clientId: ctx.request.param('client_id'),
      userId: ctx.auth.user?.id,
    })

    return TimeTrack.query()
      .where({ id: newTimeTrack.id })
      .preload('project', (query) =>
        query.preload('client', (query) => query.select(['id', 'number', 'name']))
      )
      .preload('user', (query) => query.select(['id', 'data']))
      .first()
  }

  public async update(ctx: HttpContextContract) {
    const body = await ctx.request.validate(TimeTrackValidator)
    TimeTrack.updateOrCreate(
      { id: ctx.request.param('id'), organizationId: ctx.auth.user?.organization.id },
      body
    )
  }
  public async destroy(ctx: HttpContextContract) {
    return (
      await TimeTrack.query()
        .where({
          organizationId: ctx.auth.user?.organization.id,
          id: ctx.request.param('id'),
        })
        .firstOrFail()
    ).delete()
  }
}
