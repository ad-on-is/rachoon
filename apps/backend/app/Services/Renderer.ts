import { PDFiumLibrary, PDFiumPageRenderOptions } from '@hyzyla/pdfium'
import { Locale } from '@repo/common'
import { Document as CommonDocument } from '@repo/common'
import Template from 'App/Models/Template'
import User from 'App/Models/User'
import sharp from 'sharp'
import nunjucks from 'nunjucks'
import { Format } from '@repo/common'

export default class Renderer {
  private static async renderFunction(
    options: PDFiumPageRenderOptions,
    downScaleFactor: number = 1
  ) {
    return await sharp(options.data, {
      raw: {
        width: options.width,
        height: options.height,
        channels: 4,
      },
    })
      .resize(
        Math.floor(options.width / downScaleFactor),
        Math.floor(options.height / downScaleFactor)
      )
      .png()
      .toBuffer()
  }

  public static prepareHtml(user: User, template: Template, data: any): string {
    const org = user.organization

    const loc = org.settings.general.locale
    const cur = org.settings.general.currency

    const t = (key: string, ...val: any): string => {
      return Locale.t(loc, key, val)
    }

    const currency = (value: any): string => Format.toCurrency(value, loc, cur)

    const date = (value: any): string => Format.date(new Date(value), loc)

    const longDate = (value: any): string => Format.longDate(new Date(value), loc)

    const title = org.settings[CommonDocument.getTypeString(data.type, true, true)].title
    nunjucks.configure({ autoescape: false })
    return nunjucks.renderString(template.html, {
      document: new CommonDocument(data),
      template: template,
      organization: org,
      title: title,
      user: user,
      t: t,
      format: {
        currency: currency,
        date: date,
        longDate: longDate,
      },
    })
  }

  public static async generatePDFOrImage(
    html: string,
    isImage: boolean = false,
    downScaleFactor: number = 1
  ): Promise<Buffer[]> {
    const f = new FormData()
    f.append('files', new Blob([html], { type: 'text/html' }), 'index.html')
    f.append('printBackground', 'true')
    f.append('marginTop', '0')
    f.append('marginBottom', '0')
    f.append('marginLeft', '0')
    f.append('marginRight', '0')
    f.append('preferCssPageSize', 'true')
    f.append('generateDocumentOutline', 'true')
    const res = await fetch(
      `${process.env.GOTENBERG_URL || 'http://gotenberg'}/forms/chromium/convert/html`,
      {
        method: 'POST',
        body: f,
      }
    )
    const buffer = Buffer.from(await res.arrayBuffer())

    if (isImage) {
      const library = await PDFiumLibrary.init()
      const doc = await library.loadDocument(buffer)
      const images: any = []
      for (const page of doc.pages()) {
        const p = await page.render({
          scale: 3,
          render: (options) => this.renderFunction(options, downScaleFactor),
        })
        images.push(Buffer.from(p.data))
      }
      return images
    }

    return [buffer]
  }
}
