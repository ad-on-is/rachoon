import { Document, Organization, EInvoiceType } from '@repo/common'
import { InvoiceService, InvoiceServiceOptions, Invoice } from '@e-invoice-eu/core'

function formatDateISO(date: Date): string {
  if (!date) return ''
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export default class EN16931 {
  static noTaxCode = 'E'
  static requiresPdf = (type: string) => type.startsWith('Factur-X')

  static async generate(
    doc: Document,
    org: Organization,
    format = 'CII',
    pdf?: Buffer
  ): Promise<string | Uint8Array> {
    const sellerElectronicAddress = org.data.contactPerson.email
    const sellerElectronicAddressSchemeID = 'EM' // EM = e-mail; 9930 = DE tax number
    const sellerContactName = org.data.contactPerson.fullName
    const sellerContactPhone = ''
    const sellerContactEmail = org.data.contactPerson.email
    const sellerLegalRegistrationId = '' // e.g. org.data.info.registrationId (HRB …)
    const buyerElectronicAddressSchemeID = 'EM'
    // ─────────────────────────────────────────────────────────────────────────

    const buyerElectronicAddress = doc.client!.data.contactPerson.email
    const buyerContactName = doc.client!.data.contactPerson.fullName
    const buyerContactEmail = doc.client!.data.contactPerson.email

    const noTaxCode = (doc.data.taxOption.code || EN16931.noTaxCode) as
      | 'AE'
      | 'E'
      | 'S'
      | 'Z'
      | 'G'
      | 'O'
      | 'K'
      | 'L'
      | 'M'
      | 'B'
    const currency = org.settings.general
      .currency as Invoice['ubl:Invoice']['cbc:DocumentCurrencyCode']

    // Build VAT subtotals
    type VatSubtotal = {
      'cbc:TaxableAmount': string
      'cbc:TaxableAmount@currencyID': typeof currency
      'cbc:TaxAmount': string
      'cbc:TaxAmount@currencyID': typeof currency
      'cac:TaxCategory': {
        'cbc:ID': typeof noTaxCode
        'cbc:Percent': string
        'cac:TaxScheme': { 'cbc:ID': string }
      }
    }
    const vatSubtotals: VatSubtotal[] = Object.entries(doc.data.taxes).map(([rate, taxAmount]) => ({
      'cbc:TaxableAmount': doc.totalTaxBasis(parseInt(rate)).toFixed(2),
      'cbc:TaxableAmount@currencyID': currency,
      'cbc:TaxAmount': (taxAmount as number).toFixed(2),
      'cbc:TaxAmount@currencyID': currency,
      'cac:TaxCategory': {
        'cbc:ID': 'S' as typeof noTaxCode,
        'cbc:Percent': parseInt(rate).toFixed(2),
        'cac:TaxScheme': { 'cbc:ID': 'VAT' },
      },
    }))

    if (vatSubtotals.length === 0) {
      vatSubtotals.push({
        'cbc:TaxableAmount': (doc.totalTaxBasis(0) || doc.data.net).toFixed(2),
        'cbc:TaxableAmount@currencyID': currency,
        'cbc:TaxAmount': '0.00',
        'cbc:TaxAmount@currencyID': currency,
        'cac:TaxCategory': {
          'cbc:ID': noTaxCode,
          'cbc:Percent': '0.00',
          'cac:TaxScheme': { 'cbc:ID': 'VAT' },
        },
      })
    }

    // Build invoice lines (requires at least one)
    const invoiceLines = doc.data.positions.map((p, i) => ({
      'cbc:ID': String(i + 1),
      'cbc:InvoicedQuantity': String(p.quantity),
      'cbc:InvoicedQuantity@unitCode': 'C62' as const,
      'cbc:LineExtensionAmount': p.net.toFixed(2),
      'cbc:LineExtensionAmount@currencyID': currency,
      'cac:Item': {
        'cbc:Name': p.title,
        'cac:ClassifiedTaxCategory': {
          'cbc:ID': (p.tax > 0 ? 'S' : noTaxCode) as
            | 'AE'
            | 'E'
            | 'S'
            | 'Z'
            | 'G'
            | 'O'
            | 'K'
            | 'L'
            | 'M'
            | 'B',
          'cbc:Percent': p.tax > 0 ? p.tax.toFixed(2) : '0.00',
          'cac:TaxScheme': { 'cbc:ID': 'VAT' },
        },
      },
      'cac:Price': {
        'cbc:PriceAmount': p.netNoDiscount.toFixed(2),
        'cbc:PriceAmount@currencyID': currency,
      },
    }))

    const isPeppol = format === EInvoiceType.PeppolBis

    const inv: Invoice = {
      'ubl:Invoice': {
        'cbc:CustomizationID': isPeppol
          ? 'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0'
          : 'urn:cen.eu:en16931:2017#compliant#urn:factur-x.eu:1p0:basic',
        ...(isPeppol ? { 'cbc:ProfileID': 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0' } : {}),
        'cbc:ID': doc.number,
        'cbc:IssueDate': formatDateISO(doc.data.date),
        'cbc:DueDate': formatDateISO(doc.data.dueDate),
        'cbc:InvoiceTypeCode': '380',
        'cbc:Note': [`Payment due within ${doc.data.dueDays} days.`],
        'cbc:DocumentCurrencyCode': currency,
        'cbc:BuyerReference': doc.client!.data.info.reference || 'NA',
        'cac:AccountingSupplierParty': {
          'cac:Party': {
            'cbc:EndpointID': sellerElectronicAddress,
            'cbc:EndpointID@schemeID': sellerElectronicAddressSchemeID as any,
            'cac:PostalAddress': {
              'cbc:StreetName': org.data.address.street,
              'cbc:CityName': org.data.address.city,
              'cbc:PostalZone': org.data.address.zip,
              'cac:Country': {
                'cbc:IdentificationCode': org.data.address.country as any,
              },
            },
            ...(org.data.info.vat
              ? {
                  'cac:PartyTaxScheme': [
                    {
                      'cbc:CompanyID': org.data.info.vat,
                      'cac:TaxScheme': { 'cbc:ID': 'VAT' },
                    },
                  ] as [{ 'cbc:CompanyID': string; 'cac:TaxScheme': { 'cbc:ID': string } }],
                }
              : {}),
            'cac:PartyLegalEntity': {
              'cbc:RegistrationName': org.name,
              ...(sellerLegalRegistrationId ? { 'cbc:CompanyID': sellerLegalRegistrationId } : {}),
              ...(org.data.info.addition ? { 'cbc:CompanyLegalForm': org.data.info.addition } : {}),
            },
            ...(sellerContactName || sellerContactPhone || sellerContactEmail
              ? {
                  'cac:Contact': {
                    ...(sellerContactName ? { 'cbc:Name': sellerContactName } : {}),
                    ...(sellerContactPhone ? { 'cbc:Telephone': sellerContactPhone } : {}),
                    ...(sellerContactEmail ? { 'cbc:ElectronicMail': sellerContactEmail } : {}),
                  },
                }
              : {}),
          },
        },
        'cac:AccountingCustomerParty': {
          'cac:Party': {
            'cbc:EndpointID': buyerElectronicAddress,
            'cbc:EndpointID@schemeID': buyerElectronicAddressSchemeID as any,
            'cac:PostalAddress': {
              'cbc:StreetName': doc.client!.data.address.street,
              'cbc:CityName': doc.client!.data.address.city,
              'cbc:PostalZone': doc.client!.data.address.zip,
              'cac:Country': {
                'cbc:IdentificationCode': doc.client!.data.address.country as any,
              },
            },
            ...(doc.client!.data.info.vat
              ? {
                  'cac:PartyTaxScheme': {
                    'cbc:CompanyID': doc.client!.data.info.vat,
                    'cac:TaxScheme': { 'cbc:ID': 'VAT' },
                  },
                }
              : {}),
            'cac:PartyLegalEntity': {
              'cbc:RegistrationName': `${doc.client!.name} ${
                doc.client!.data.info.addition
              }`.trim(),
            },
            ...(buyerContactName || buyerContactEmail
              ? {
                  'cac:Contact': {
                    ...(buyerContactName ? { 'cbc:Name': buyerContactName } : {}),
                    ...(buyerContactEmail ? { 'cbc:ElectronicMail': buyerContactEmail } : {}),
                  },
                }
              : {}),
          },
        },
        'cac:Delivery': {
          'cbc:ActualDeliveryDate': formatDateISO(
            doc.data.deliveryDate ? doc.data.deliveryDate : doc.data.date
          ),
        },
        'cac:PaymentMeans': [
          {
            'cbc:PaymentMeansCode': '58',
            'cac:PayeeFinancialAccount': {
              'cbc:ID': org.data.payment.iban,
              'cbc:Name': org.data.payment.accountHolder || org.name,
              ...(org.data.payment.bic
                ? { 'cac:FinancialInstitutionBranch': { 'cbc:ID': org.data.payment.bic } }
                : {}),
            },
          },
        ],
        'cac:PaymentTerms': {
          'cbc:Note': `Payment due within ${doc.data.dueDays} days.`,
        },
        'cac:TaxTotal': [
          {
            'cbc:TaxAmount': doc.totalTaxes().toFixed(2),
            'cbc:TaxAmount@currencyID': currency,
            'cac:TaxSubtotal': vatSubtotals,
          },
        ],
        'cac:LegalMonetaryTotal': {
          'cbc:LineExtensionAmount': doc.data.net.toFixed(2),
          'cbc:LineExtensionAmount@currencyID': currency,
          'cbc:TaxExclusiveAmount': doc.data.net.toFixed(2),
          'cbc:TaxExclusiveAmount@currencyID': currency,
          'cbc:TaxInclusiveAmount': doc.data.total.toFixed(2),
          'cbc:TaxInclusiveAmount@currencyID': currency,
          'cbc:ChargeTotalAmount': doc.totalCharges().toFixed(2),
          'cbc:ChargeTotalAmount@currencyID': currency,
          'cbc:AllowanceTotalAmount': doc.totalDiscounts().toFixed(2),
          'cbc:AllowanceTotalAmount@currencyID': currency,
          'cbc:PayableAmount': doc.data.total.toFixed(2),
          'cbc:PayableAmount@currencyID': currency,
        },
        'cac:InvoiceLine': invoiceLines as Invoice['ubl:Invoice']['cac:InvoiceLine'],
      },
    }

    const invoiceService = new InvoiceService(console)
    const opts = {
      format: isPeppol ? 'UBL' : format,
      lang: 'en',
      ...(pdf
        ? {
            pdf: {
              buffer: pdf,
              filename: 'invoice.pdf',
              mimetype: 'application/pdf' as const,
            },
          }
        : {}),
    } as InvoiceServiceOptions
    return invoiceService.generate(inv, opts)
  }
}
