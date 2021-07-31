# Writing the Loader

So what are we aiming for?
First thing first, we want to just load our CSS from our JS.

Let's create our CSS file and call it `index.css`.
```css
.app {
	background: red;
}
```

And of course, use it in the index.js file:
```js
import React from 'react';
import { render } from 'react-dom';
import './index.css'

render(
  <div className="app"> Hello World! </div>,
  document.getElementById('root')
);
```

Run our application:
```bash
npm run serve
```

Now you probably see this error in the console:
![Error](./assets/failed-to-load-css-error.png)

This error make a lot of sense, webpack does not know by default how to handle CSS imports and we should tell it how.

## Creating Webpack Loader

### What are loaders?

*webpack enables use of loaders to preprocess files. This allows you to bundle any static resource way beyond JavaScript.*

To put it simply for our case, they are functions that take the css file as input and output a js file\
_**CSS -> JS**_

### Loader implementation

Let's create a file parallel to the `webpack.config.js` named `loader.js`.
Our goal is to append the style value we get from the css file inside the dom.

`loader.js`:
```js

// Appending the style inside the head
function appendStyle(value) {
    const style = document.createElement('style');
    style.textContent = value;
    document.head.appendChild(style);
}

module.exports = (fileValue) => {
  // We stringify the appendStyle method and creating a file that will invoked with the css file value in run time
  return `
    (${appendStyle.toString()})(${JSON.stringify(fileValue)})
  `
}
```

Now we need to register it inside the webpack config.

`webpack.config.js`:
```js
const config = {
  //... rest of the config
    module: {
        rules: [
          // ... other rules not related to CSS
            {
                test: /\.css$/,
                loader: require.resolve('./loader')
            }
        ]
    }
  // ...
}
```

Restart the terminal and we got it! 🎊

![Loader success](./assets/loader-out-result.png)

## [Next chapter](./css-plugin.md)
### [Previous chapter](./setup-the-solution.md)