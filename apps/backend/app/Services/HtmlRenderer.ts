import { launch, LaunchOptions, PDFOptions } from 'puppeteer'
import { fromBuffer } from 'pdf2pic'
export interface PuppeteerOptions {
  launch?: LaunchOptions
  pdf?: PDFOptions
}

export default class HtmlRenderer {
  constructor() {}

  public async renderFromHtml(html: string, isPreview: boolean = false) {
    const { browser, page } = await this.getBrowserAndPage()

    await page.setContent(html)
    await page.evaluateHandle('document.fonts.ready')

    const pdfOptions: PDFOptions = {
      // format: 'A4',
      scale: 1,
      printBackground: true,
      preferCSSPageSize: true,
    }
    try {
      const pdf = await page.pdf(pdfOptions)
      const pageCount = pdf.toString().match(/\/Type[\s]*\/Page[^s]/g)!.length
      if (isPreview) {
        const preview = fromBuffer(pdf, {
          width: 1240,
          height: 1754,
          format: 'png',
        })
        const images: any = []
        for (let i = 0; i < pageCount; i++) {
          images.push('data:image/png;base64,' + (await preview(i + 1, true))['base64'])
        }

        return images
      }

      return ['data:application/pdf;base64,' + pdf.toString('base64')]
    } catch (e) {
    } finally {
      await browser.close()
    }
  }

  /**
   *
   * @param path The file path to save the PDF to. If path is a relative path, then it is resolved relative to current
   * working directory. If no path is provided, the PDF won't be saved to the disk.
   */
  public async renderFromHtmlToFile(html: string, path: string) {
    const { browser, page } = await this.getBrowserAndPage()

    await page.setContent(html, {})

    const pdfOptions: PDFOptions = {
      format: 'A4',
    }
    await page.pdf({
      ...pdfOptions,
      path,
    })
    await browser.close()
  }

  private async getBrowserAndPage() {
    const minimalArgs = [
      '--autoplay-policy=user-gesture-required',
      '--disable-background-networking',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-breakpad',
      '--disable-client-side-phishing-detection',
      '--disable-component-update',
      '--disable-default-apps',
      '--disable-dev-shm-usage',
      '--disable-domain-reliability',
      '--disable-extensions',
      '--disable-features=AudioServiceOutOfProcess',
      '--disable-hang-monitor',
      '--disable-ipc-flooding-protection',
      '--disable-notifications',
      '--disable-offer-store-unmasked-wallet-cards',
      '--disable-popup-blocking',
      '--disable-print-preview',
      '--disable-prompt-on-repost',
      '--disable-renderer-backgrounding',
      '--disable-setuid-sandbox',
      '--disable-speech-api',
      '--disable-sync',
      '--hide-scrollbars',
      '--ignore-gpu-blacklist',
      '--metrics-recording-only',
      '--mute-audio',
      '--no-default-browser-check',
      '--no-first-run',
      '--no-pings',
      '--no-sandbox',
      '--no-zygote',
      '--password-store=basic',
      '--use-gl=swiftshader',
      '--use-mock-keychain',
    ]
    const browser = await launch({
      args: minimalArgs,
      executablePath: '/usr/bin/chromium-browser',
      defaultViewport: {
        width: 1240,
        height: 1754,
      },
    })
    const page = await browser.newPage()

    return { browser, page }
  }
}
