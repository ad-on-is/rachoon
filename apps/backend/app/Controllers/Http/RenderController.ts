import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import HtmlRenderer from 'App/Services/HtmlRenderer'

export default class RenderController {
  public async index(ctx: HttpContextContract) {
    if (ctx.request.qs()['count']) {
      return await Client.query().getCount()
    }
    return await Client.query().orderBy('created_at', 'desc')
  }

  public async store(ctx: HttpContextContract) {
    const data: any = ctx.request.body()

    const template = data.html

    const preview = ctx.request.qs()['preview'] || false

    const renderer = new HtmlRenderer()
    return await renderer.renderFromHtml(template, preview)
  }

  public async show(ctx: HttpContextContract) {
    return await Client.query()
      .where({ id: ctx.request.param('id') })
      .firstOrFail()
  }
}
