# CSS Webpack Plugin - Style the modern web
​
_Styling a modern application is no simple task - traditionally it is done by serving HTML with CSS for styling, and sprinkling the web app with Javascript to get the job done.
The question is how to modernize the approach of setting up an app, and the answer is to use **Webpack** and **React**._
​
Agenda - 
* [Part 1: Understanding the issue with native CSS.](./docs/native-css-issue.md)
* [Part 2: Setting up our Webpack application without a CSS plugin.](./docs/setup-the-solution.md)
* [Part 3: Writing the Loader.](./docs/css-loader.md)
* [Part 4: Writing advanced Plugin.](./docs/css-plugin.md)
​
> If you are here just for implementation information, skip to part 3.
​
> Disclaimer - This is not a production-ready plugin. To see one that is, check out what my team and I are working on: [Stylable](https://stylable.io/)
​
## Development
​
This project is written as a Yarn workspace with TypeScript, and contains two main packages:
​
```
- css-loader
- css-plugin
```
​
For examples of different frameworks, see [`examples`](./examples).
​
### Bootstrap
​
```bash
yarn
yarn build
```
​
### Testing
​
The package `css-loader` has integration tests to ensure the correct output is received from the loader.
​
Inside the `css-plugin` package is an e2e test that creates a project, serves it with playwright, and makes sure that the UI works according to the output.