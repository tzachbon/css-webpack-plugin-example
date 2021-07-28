import cssLoader from '@webpack-css/loader'
import { expect } from 'chai'
import { loaderContext, loaderContextWithoutOutputCSS } from './mocks'
import { transformCSSClasses, transformAndAddStyleScript } from './fixtures/css-loader'

describe('cssLoader', () => {
  let ctx: any
  beforeEach(() => {
    ctx = loaderContext as any
  })

  it('should transform css classes', () => {
    const { expected, css, expectedCSS } = transformCSSClasses;

    expect(cssLoader.call(ctx, css)).to.equal(expected)
    expect(loaderContext.setOutputCSS).to.have.been.calledWith(expectedCSS)
  })

  it('should transform and add style script', () => {
    ctx = loaderContextWithoutOutputCSS
    const { expected, css } = transformAndAddStyleScript;

    expect(cssLoader.call(ctx, css)).to.equal(expected)
    expect(loaderContext.setOutputCSS).to.not.have.been.called
  })
})
