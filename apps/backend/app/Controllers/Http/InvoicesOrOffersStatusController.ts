import InvoiceOrOffer from 'App/Models/InvoiceOrOffer'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StatusValidator } from 'App/Validators/InvoiceOrOffer'

export default class InvoiceStatusController {
  public async update(ctx: HttpContextContract) {
    const body = await ctx.request.validate(StatusValidator)
    return await InvoiceOrOffer.query()
      .where({
        id: ctx.request.param('id'),
        organizationId: ctx.auth.user?.organization.id,
      })
      .update(body)
  }
}
