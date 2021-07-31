# CSS Webpack Plugin - Style the modern web

_Styling modern applications are no simple task.
As we know, the web can handle HTML, CSS, and Javascript.
If we would like to create a web app, we will need to serve an HTML with CSS for styling. 
How can we do it on our own in a modern setup with **Webpack** and **React**?_

Agenda - 
* [Part 1: Understanding the issue with native CSS.](./docs/native-css-issue.md)
* [Part 2: Setting up our webpack application without a CSS plugin.](./docs/setup-the-solution.md)
* [Part 3: Writing the Loader.](./docs/css-loader.md)
* [Part 4: Writing advanced Plugin.](./docs/css-plugin.md)

> If you are here just for the implementation, skip to part 3.

## Development

This project is written as yarn workspace with typescript and has 2 main packages:

```
- css-loader
- css-plugin
```

The `example-package` is an example for the use of the loader and the plugin.

### Bootstrap

```bash
yarn
yarn build
```

### Testing

In the package `css-loader` we have integration tests the make sure we get the correct output from the loader.

Inside the `css-plugin`, we create an e2e test that creates a project, serves it with playwright, and makes sure that UI works according to the output.