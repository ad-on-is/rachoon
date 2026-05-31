import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RenderValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    templateId: schema.number.optional(),
    data: schema.object().anyMembers(),
  })

  public messages: CustomMessages = {}
}
