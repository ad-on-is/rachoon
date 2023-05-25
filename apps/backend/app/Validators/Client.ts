import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClientValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    number: schema.string(),
    data: schema.object().members({
      address: schema.object().members({
        street: schema.string(),
        zip: schema.string(),
        city: schema.string(),
        country: schema.string(),
      }),
      info: schema.object.optional().members({
        vat: schema.string.optional(),
        addition: schema.string.optional(),
      }),
      contactPerson: schema.object().members({
        fullName: schema.string.optional(),
        email: schema.string([rules.email()]),
      }),
      conditions: schema.object.optional().members({
        earlyPayment: schema.object.optional().members({
          days: schema.number.optional(),
          discount: schema.number.optional(),
        }),
        invoiceDueDays: schema.number.optional(),
        discount: schema.object.optional().members({
          value: schema.number.optional(),
          valueType: schema.enum.optional(['percent', 'fixed']),
        }),
        rate: schema.number.optional(),
      }),
    }),
  })

  public messages: CustomMessages = {}
}
