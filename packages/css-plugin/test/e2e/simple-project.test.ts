import { expect } from 'chai'
import { BASE_URL, getSimpleProject } from '../fixtures/simple-project'

describe('simple-project', () => {
  const project = getSimpleProject().beforeAndAfter()

  it('should get simple project files', async () => {
    await project.startProject({ waitMatcher: new RegExp(`Accepting connections at ${BASE_URL}`) })

    const context = await project.browser().newContext()
    const page = await context.newPage()
    await page.goto(BASE_URL)

    const styleScripts = await page.$$eval('style', styles => styles.map(s => s.textContent))
    const links = await page.$$eval('link', links => links.map(link => ({
      href: link.href,
      rel: link.rel
    })))

    expect(styleScripts).to.deep.equal([])
    expect(links).to.deep.equal([{ href: `${BASE_URL}/main.css`, rel: 'stylesheet' }])
  })
})
