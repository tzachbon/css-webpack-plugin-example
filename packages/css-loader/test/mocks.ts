import sinon from 'sinon'

export const loaderContextWithoutOutputCSS = {
  resourcePath: '__path__',
}

export const loaderContext = {
  ...loaderContextWithoutOutputCSS,
  setOutputCSS: sinon.mock()
}
