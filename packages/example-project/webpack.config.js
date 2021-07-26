const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CSSPlugin } = require('@webpack-css/plugin')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    plugins: [new CSSPlugin(),new HtmlWebpackPlugin()],
};