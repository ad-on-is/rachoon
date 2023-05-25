import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

class ProfileValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    email: schema.string([
      rules.email(),
      rules.unique({ table: 'users', column: 'email', whereNot: { id: this.ctx.auth.user?.id } }),
    ]),
    data: schema.object().members({
      fullName: schema.string(),
      username: schema.string(),
      avatar: schema.string.optional(),
    }),
  })

  public messages: CustomMessages = {}
}

class UserValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    email: schema.string([
      rules.email(),
      rules.unique({
        table: 'users',
        column: 'email',
        whereNot: { id: this.ctx.request.param('id') },
      }),
    ]),
    role: schema.enum(['admin', 'user']),
    password: this.ctx.request.param('id') ? schema.string.optional() : schema.string(),
    data: schema.object().members({
      fullName: schema.string(),
      username: schema.string(),
      avatar: schema.string.optional(),
      rate: schema.number.optional(),
    }),
  })

  public messages: CustomMessages = {}
}

class PasswordValidator {
  public schema = schema.create({
    password: schema.string(),
  })

  public messages: CustomMessages = {}
}

export { ProfileValidator, PasswordValidator, UserValidator }
