import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    organization: schema.object().members({
      name: schema.string(),
      slug: schema.string([
        rules.unique({ table: 'organizations', column: 'slug' }),
        rules.notIn(['app', 'rachoon', 'api', 'www']),
      ]),
    }),
    user: schema.object().members({
      email: schema.string([rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string(),
      data: schema.object().members({
        fullName: schema.string(),
      }),
    }),
  })

  public messages: CustomMessages = {}
}
