import sinon from 'sinon'

export const loaderContextWithoutOutputCSS = {
  resourcePath: '__path__.css',
}

export const loaderContext = {
  ...loaderContextWithoutOutputCSS,
  setOutputCSS: sinon.mock()
}
