import Database from '@ioc:Adonis/Lucid/Database'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientValidator from 'App/Validators/Client'
import Client from '../../Models/Client'

export default class ClientsController {
  public async index(ctx: HttpContextContract) {
    if (ctx.request.qs()['count']) {
      return await Client.query()
        .where({ organizationId: ctx.auth.user?.organizationId })
        .getCount()
    }
    return await Client.query()
      .where({ organizationId: ctx.auth.user?.organizationId })
      .withCount('invoices', (query) => query.as('totalInvoices'))
      .withCount('invoices', (query) => query.where({ status: 'pending' }).as('pendingInvoices'))
      .withCount('offers', (query) => query.as('totalOffers'))
      .withCount('offers', (query) => query.where({ status: 'pending' }).as('pendingOffers'))
      .withCount('projects', (query) => query.as('totalProjects'))
      .withAggregate('timeTracks', (query) =>
        query.sum(Database.knexRawQuery(`(data->>'minutes')::int`)).as('minutes')
      )
      .orderBy('created_at', 'desc')
  }

  public async store(ctx: HttpContextContract) {
    const body = await ctx.request.validate(ClientValidator)
    return await Client.create({
      ...body,
      organizationId: ctx.auth.user?.organizationId,
    })
  }

  public async destroy(ctx: HttpContextContract) {
    return (
      await Client.query()
        .where({
          organizationId: ctx.auth.user?.organization.id,
          id: ctx.request.param('id'),
        })
        .firstOrFail()
    ).delete()
  }

  public async update(ctx: HttpContextContract) {
    const body = await ctx.request.validate(ClientValidator)
    return await Client.query()
      .where({ id: ctx.request.param('id'), organizationId: ctx.auth.user?.organizationId })
      .update({
        ...body,
      })
  }

  public async show(ctx: HttpContextContract) {
    return await Client.query()
      .where({ id: ctx.request.param('id'), organizationId: ctx.auth.user?.organizationId })
      .firstOrFail()
  }
}
