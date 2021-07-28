export const getPackageJSON = (defaults: object) => JSON.stringify(({
  ...defaults,
  "name": "example" + Math.random().toString(36).slice(2),
  "version": "1.0.0",
  "main": "index.js",
  "private": true,
  "license": "MIT",
  "scripts": {
    "clean": "rm -rf dist",
    "start": "webpack serve --open",
    "build": "webpack --mode=production --node-env=production",
    "build:dev": "webpack --mode=development",
    "build:prod": "webpack --mode=production --node-env=production",
    "watch": "webpack --watch",
    "serve": "serve ./dist"
  },
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  }
}))