import { expect } from 'chai'
import { BASE_URL, getSimpleProject } from '../fixtures/simple-project'

describe('simple-project', () => {
  const project = getSimpleProject().beforeAndAfter()

  it('should get simple project files', async () => {
    await project.startProject()

    const context = await project.browser().newContext()
    const page = await context.newPage()
    await page.goto(BASE_URL)

    const styleScripts = await page.$$('style')
    const links = await page.$$eval('link', links => links.map(link => ({
      href: link.href,
      rel: link.rel
    })))

    expect(styleScripts).to.deep.equal([])
    expect(links).to.deep.equal([{ href: `${BASE_URL}/main.css`, rel: 'stylesheet' }])
  })
})
