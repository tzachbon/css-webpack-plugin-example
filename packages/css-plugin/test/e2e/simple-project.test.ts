import { expect } from 'chai'
import { BASE_URL, getSimpleProject } from '../fixtures/simple-project'

describe('simple-project', () => {
  const project = getSimpleProject().beforeAndAfter()

  it('should serve simple project and find only css link tags', async () => {
    await project.startProject({ waitMatcher: new RegExp(`Accepting connections at ${BASE_URL}`) })

    const web = await project.initWebDriver()
    await web.goto(BASE_URL)

    expect(await web.styles()).to.deep.equal([])
    expect(await web.links()).to.deep.equal([{ href: `${BASE_URL}/main.css`, rel: 'stylesheet' }])
  })
})
