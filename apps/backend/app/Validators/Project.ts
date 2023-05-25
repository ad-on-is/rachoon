import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProjectValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    number: schema.string([
      rules.unique({
        table: 'projects',
        column: 'number',
        where: { organization_id: this.ctx.auth.user?.organizationId },
        whereNot: { id: this.ctx.request.param('id') || null },
      }),
    ]),
    data: schema.object().members({
      title: schema.string(),
      description: schema.string.optional(),
      rate: schema.number(),
      discount: schema.number.optional(),
    }),
  })

  public messages: CustomMessages = {}
}
