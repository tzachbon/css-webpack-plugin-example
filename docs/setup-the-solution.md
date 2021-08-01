# Setting up our webpack application without a CSS plugin.

## The solutions

Currently, there are many different solutions to these problems,
from utility frameworks, CSS preprocessors, and many more that try to help with most of the issues that native CSS has.

In this article, I would like to solve some of those problems from scratch with you.

Let's set up our environment real quick, run those commands:

```bash
mkdir example-css-plugin
cd example-css-plugin
npm init -y
npm i -D webpack webpack-cli @webpack-cli/generators @babel/preset-react
npm i react react-dom
```

Once it is finished installing the development dependencies, let's run the webpack init command.

```bash
npx webpack init
```

For our set up your answers should look like this: 

```
? Which of the following JS solutions do you want to use? ES6
? Do you want to use webpack-dev-server? Yes
? Do you want to simplify the creation of HTML files for your bundle? Yes
? Do you want to add PWA support? No
? Which of the following CSS solutions do you want to use? none
? Do you like to install prettier to format generated configuration? No
```

### **Make sure that you say, "Which of the following CSS solutions do you want to use" - none.**

## Configure React

Go to `.babelrc` and make sure presets array includes "@babel/preset-react".

```json
{
    "plugins": ["@babel/syntax-dynamic-import"],
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": false
            }
        ],
            "@babel/preset-react"
    ]
}
```

Now we need to go to `index.html` and make sure it has div with root id.

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>CSS Webpack Plugin example</title>
    </head>
    <body>
        <div id="root"></div>
    </body>    
</html>
```

After all of that, we are ready to write our app inside `src/index.js`:
```js
import React from 'react';
import { render } from "react-dom";

render(
  <div>
    Hello World
  </div>,
  document.getElementById('root')
)
```

## [Next chapter](./css-loader.md)
### [previous chapter](./native-css-issue.md)