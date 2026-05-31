import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Template from 'App/Models/Template'
import Renderer from 'App/Services/Renderer'
import TemplateValidator from 'App/Validators/Template'
import { DocumentType, Example } from '@repo/common'

export default class TemplatessController {
  private async removeDefault(ctx: HttpContextContract, id: number) {
    await Template.query()
      .where({ organizationId: ctx.auth.user?.organizationId })
      .andWhereNot({ id: id })
      .update({ default: false })
  }

  private async generateThumbnail(ctx: HttpContextContract, template: Template): Promise<string> {
    const html = Renderer.prepareHtml(ctx.auth.user!, template, Example.get(DocumentType.Invoice))
    const res = await Renderer.generatePDFOrImage(html, true, 10)
    return `data:image/png;base64,${res[0].toString('base64')}`
  }

  public async index(ctx: HttpContextContract) {
    return await Template.query()
      .andWhere((q) => {
        q.where({ organizationId: ctx.auth.user?.organizationId }).orWhere({
          organizationId: null,
        })
      })
      .orderBy('organization_id', 'desc')
      .withScopes((scopes) => scopes.sortBy(ctx, Template))
      .withScopes((scopes) => scopes.filterBy(ctx, Template))
      .withScopes((scopes) => scopes.searchBy(ctx, Template))

      .paginate(ctx.request.qs()['page'] || 1, ctx.request.qs()['perPage'] || 20)
  }

  public async store(ctx: HttpContextContract) {
    const body = await ctx.request.validate(TemplateValidator)
    const created = await Template.create({
      ...body,
      organizationId: ctx.auth.user?.organizationId,
    })
    created.thumbnail = await this.generateThumbnail(ctx, created)
    await created.save()
    if (body.default) {
      await this.removeDefault(ctx, created.id)
    }
  }

  public async destroy(ctx: HttpContextContract) {
    return (
      await Template.query()
        .where({
          organizationId: ctx.auth.user?.organization.id,
          id: ctx.request.param('id'),
        })
        .andWhereNot({ default: true })
        .firstOrFail()
    ).delete()
  }

  public async update(ctx: HttpContextContract) {
    const body = await ctx.request.validate(TemplateValidator)
    const template = await Template.query()
      .where({ id: ctx.request.param('id'), organizationId: ctx.auth.user!.organizationId })
      .firstOrFail()

    template.merge(body)
    template.thumbnail = await this.generateThumbnail(ctx, template)

    await template.save()
    if (template.default) {
      await this.removeDefault(ctx, template.id)
    }
    return template
  }

  public async show(ctx: HttpContextContract) {
    return await Template.query()
      .where({ id: ctx.request.param('id'), organizationId: ctx.auth.user?.organizationId })
      .orWhere({ id: ctx.request.param('id'), organizationId: null })
      .firstOrFail()
  }

  public async duplicate(ctx: HttpContextContract) {
    const template = await Template.query()
      .where({ id: ctx.request.param('id'), organizationId: ctx.auth.user?.organizationId })
      .orWhere({ id: ctx.request.param('id'), organizationId: null })
      .firstOrFail()

    const duplicate = new Template()
    duplicate.fill(template.$attributes)
    duplicate.$attributes.title = `${template.title} (Copy)`
    delete duplicate.$attributes.id
    delete duplicate.$attributes.created_at
    delete duplicate.$attributes.updated_at
    duplicate.$attributes.organizationId = ctx.auth.user!.organizationId
    duplicate.$attributes.title = `${template.title} (Copy)`
    duplicate.$attributes.default = false
    duplicate.$attributes.premium = false

    return await duplicate.save()
  }
}
