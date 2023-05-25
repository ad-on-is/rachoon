import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TimeTrackValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    date: schema.date(),
    data: schema.object().members({
      title: schema.string(),
      description: schema.string.optional(),
      minutes: schema.number(),
    }),
  })

  public messages: CustomMessages = {}
}
