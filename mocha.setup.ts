import chai from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
import playwright from 'playwright'

chai.use(sinonChai)

let _browser: playwright.Browser

before(async () => {
  _browser = await playwright.chromium.launch();

  (global as any)._browser = _browser
})

after(async () => {
  await _browser.close()
})

beforeEach(async () => {
  sinon.reset()
})