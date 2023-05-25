import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class OrganizationValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string(),
    data: schema.object().anyMembers(),
    settings: schema.object().anyMembers(),
  })

  public messages: CustomMessages = {}
}
