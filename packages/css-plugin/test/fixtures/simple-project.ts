import { Dir, getPackageJSON, setup } from '../utils';

export const BASE_URL = 'http://localhost:5000';

export const getSimpleProject = () => {
  const name = 'simple-project';
  const files: Dir = {
    'package.json': getPackageJSON({ name }),
    src: {
      'index.css': `.root { background: red; }`,
      'index.tsx': `
      import classes from './index.css';
      import ReactDOM from 'react-dom';
      
      
      ReactDOM.render(
        <div className={classes.root} >Hello</div>,
        document.body.appendChild(document.createElement('main'))
      )
      `
    },
    'webpack.config.js': `

    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const { CSSPlugin } = require('@webpack-css/plugin')
    
    module.exports = {
        mode: 'development',
        devtool: 'source-map',
        entry: './src/index.tsx',
        module: {
            rules: [
                {
                    test: /.tsx?$/,
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                },
                {
                    test: /.(png|jpg|jpeg|gif|svg)$/,
                    type: 'asset',
                },
            ],
        },
        resolve: {
            extensions: ['ts', 'tsx', '.js', '.json'],
        },
        plugins: [new CSSPlugin(), new HtmlWebpackPlugin()],
    };    
`
  }

  return setup({ files })
}