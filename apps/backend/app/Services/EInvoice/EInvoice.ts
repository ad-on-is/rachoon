import Organization from 'App/Models/Organization'
import Document from 'App/Models/Document'
import { Document as CommonDocument, Organization as CommonOrg, EInvoiceType } from '@repo/common'
import EN16931 from './EN16931'
import { PDFDocument } from 'pdf-lib'

export default class EInvoice {
  async generate(doc: Document, org: Organization, pdf?: Buffer): Promise<Buffer> {
    const commonDoc = new CommonDocument(doc)
    const commonOrg = new CommonOrg(org)

    const type =
      commonDoc.data.eInvoiceType || commonOrg.settings.invoices.eInvoiceType || EInvoiceType.CII

    if (EN16931.requiresPdf(type)) {
      const result = await EN16931.generate(commonDoc, commonOrg, type, pdf)
      return Buffer.from(result as Uint8Array)
    } else {
      const xml = await EN16931.generate(commonDoc, commonOrg, type)
      if (pdf) {
        return await this.embed(pdf, xml.toString())
      }
      return Buffer.from(xml.toString())
    }
  }

  async embed(pdf: Buffer, xml: string) {
    const pdfDoc = await PDFDocument.load(pdf)

    const xmlAttachmentName = 'factur-x.xml'
    const xmlBytes = Buffer.from(xml, 'utf8')

    await pdfDoc.attach(xmlBytes, xmlAttachmentName, {
      mimeType: 'application/xml',
      description: 'E-Invoice XML data',
      creationDate: new Date(),
      modificationDate: new Date(),
    })

    const pdfDocWithAttachedXml = await pdfDoc.save()
    return Buffer.from(pdfDocWithAttachedXml.buffer)
  }
}
