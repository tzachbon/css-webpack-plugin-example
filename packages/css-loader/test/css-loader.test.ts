import { expect } from 'chai'
import { loaderContext, loaderContextWithoutOutputCSS } from './mocks'
import cssLoader, { appendStyle } from '@webpack-css/loader'

describe('cssLoader', () => {
  let ctx: any

  beforeEach(() => {
    ctx = loaderContext as any
  })

  it('should transform css classes', () => {
    const expected = JSON.stringify('\n\n  export default {"root":"s5f2d35__root","label":"s5f2d35__label"}')

    expect(cssLoader.call(ctx, '.root { color: red; } div .label { font-size: 1rem; }')).to.equal(expected)
    expect(loaderContext.setOutputCSS).to.have.been.called
  })

  it('should transform and add style script', () => {
    ctx = loaderContextWithoutOutputCSS
    const css = '.root { color: red; } div .label { font-size: 1rem; }'
    const expected = JSON.stringify(`(${appendStyle})(${JSON.stringify('.s5f2d35__root { color: red; } div .s5f2d35__label { font-size: 1rem; }')})\n\n  export default {"root":"s5f2d35__root","label":"s5f2d35__label"}`)

    expect(cssLoader.call(ctx, css)).to.equal(expected)
    expect(loaderContext.setOutputCSS).to.not.have.been.called
  })
})
