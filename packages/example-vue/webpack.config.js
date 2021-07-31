const { CSSPlugin } = require('@webpack-css/plugin')
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.svg$/,
                type: 'asset'
            },
        ],
    },
    plugins: [
        new CSSPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin(),
    ],
};