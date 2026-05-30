import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientValidator from 'App/Validators/Client'
import Client from '../../Models/Client'
import Numberervice from 'App/Services/Number'
import { DocumentStatus } from '@repo/common'
import Document from 'App/Models/Document'

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
      .withCount('invoices', (query) =>
        query
          .where({ status: DocumentStatus.Pending })
          .andWhereRaw(`(data->>'dueDate')::timestamptz < NOW()`)
          .as('pendingInvoices')
      )
      .withCount('offers', (query) => query.as('totalOffers'))
      .withCount('offers', (query) =>
        query
          .where({ status: DocumentStatus.Pending })
          .andWhereRaw(`(data->>'dueDate')::timestamptz < NOW()`)
          .as('pendingOffers')
      )
      .withCount('reminders', (query) => query.as('totalReminders'))
      .withCount('reminders', (query) =>
        query
          .where({ status: DocumentStatus.Pending })
          .andWhereRaw(`(data->>'dueDate')::timestamptz < NOW()`)
          .as('pendingReminders')
      )
      .withScopes((scopes) => scopes.sortBy(ctx, Client))
      .withScopes((scopes) => scopes.filterBy(ctx, Client))
      .withScopes((scopes) => scopes.searchBy(ctx, Client))
      .paginate(ctx.request.qs()['page'] || 1, ctx.request.qs()['perPage'] || 20)
  }

  public async store(ctx: HttpContextContract) {
    const body = await ctx.request.validate(ClientValidator)
    body.number = await Numberervice.client(ctx.auth.user!.organizationId)
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

  public async autocomplete(ctx: HttpContextContract) {
    if (ctx.request.qs()['q']) {
      return await Client.query().withScopes((scopes) => scopes.searchBy(ctx, Client))
    }
    const docs = await Document.query()
      .where({ organizationId: ctx.auth.user?.organizationId })
      .select('clientId')
      .max('created_at as maxCreatedAt')
      .groupBy('clientId')
      .orderByRaw('max(created_at) desc')
      .limit(2)
    const ids = docs.map((d) => d.clientId)
    return await Client.query().whereIn('id', ids)
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
