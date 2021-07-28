import { expect } from 'chai'
import { getSimpleProject } from '../fixtures/simple-project'

describe('simple-project', () => {
  const project = getSimpleProject().beforeAndAfter()

  it('should get simple project files', async () => {
    await project.run()
    const { stdout, stderr } = await project.run('build')

    expect(stdout).to.match(/compiled successfully/)
    expect(stderr).to.equal('')
  })
})
