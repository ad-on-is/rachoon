import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DocumentType } from '@repo/common'
import Template from 'App/Models/Template'
import Renderer from 'App/Services/Renderer'
import EInvoice from 'App/Services/EInvoice'
import RenderValidator from 'App/Validators/Render'

export default class RenderController {
  public async store(ctx: HttpContextContract) {
    const body: any = await ctx.request.validate(RenderValidator)
    const org = ctx.auth.user!.organization

    const template = await Template.query()
      .if(
        body.templateId,
        (query) => {
          query
            .where({ id: body.templateId, organizationId: org.id })
            .orWhere({ id: body.templateId, organizationId: null })
        },
        (query) => query.where({ organizationId: null })
      )
      .firstOrFail()

    const wantPreview = ctx.request.qs()['preview'] || false
    const wantXml = ctx.request.qs()['xml'] || false

    const html = Renderer.prepareHtml(ctx.auth.user!, template, body.data)
    const rendered = await Renderer.generatePDFOrImage(html, wantPreview, 1)

    if (!wantPreview && body.data.type === DocumentType.Invoice) {
      const eInvoice = new EInvoice()
      const generated = await eInvoice.generate(body.data, org, wantXml ? undefined : rendered[0])
      if (wantXml) {
        return generated.toString()
      }
      return `data:application/pdf;base64,${generated.toString('base64')}`
    }

    return rendered.map((r) => {
      return `data:image/png;base64,${r.toString('base64')}`
    })
  }
}
