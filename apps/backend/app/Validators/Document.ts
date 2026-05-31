import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { EInvoiceType } from '@repo/common'

class DocumentValidator {
  public schema = schema.create({
    clientId: schema.number(),
    number: schema.string(),
    status: schema.number(),
    offerId: schema.number.optional(),
    templateId: schema.number.optional(),
    invoiceId: schema.number.optional(),
    recurringInvoice: schema.object.optional().anyMembers(),
    data: schema.object().members({
      positions: schema.array().anyMembers(),
      discountsCharges: schema.array.optional().anyMembers(),
      taxes: schema.object().anyMembers(),
      taxOption: schema.object().anyMembers(),
      date: schema.date(),
      dueDate: schema.date(),
      deliveryDate: schema.date.optional(),
      headingText: schema.string.optional(),
      footerText: schema.string.optional(),
      total: schema.number(),
      net: schema.number(),
      netNoDiscount: schema.number(),
      dueDays: schema.number(),
      title: schema.string.optional(),
      eInvoiceType: schema.enum.optional(Object.values(EInvoiceType)),
    }),
  })

  public messages: CustomMessages = {}
}

class StatusValidator {
  public schema = schema.create({
    status: schema.number(),
  })
  public messages: CustomMessages = {}
}

export { DocumentValidator, StatusValidator }
