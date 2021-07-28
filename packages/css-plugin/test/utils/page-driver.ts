import type { Browser, Page, BrowserContext } from 'playwright';

export class Driver {
  private page!: Page
  private context!: BrowserContext
  currentUrl: string | undefined

  private constructor(
    private browser: Browser
  ) { }

  static create(browser: Browser) {
    return new this(browser).init()
  }

  async init() {
    this.context = await this.browser.newContext()
    this.page = await this.context.newPage()

    return this
  }

  async goto(url: string) {
    this.currentUrl = url;
    
    return this.page.goto(url)
  }


  async links() {
    return await this.page.$$eval('link', links => links.map(link => ({
      href: link.href,
      rel: link.rel
    })))
  }

  async styles() {
    return await this.page.$$eval('style', styles => styles.map(s => s.textContent))
  }
}