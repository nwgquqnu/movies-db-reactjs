const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const packageJson = require('./package.json');

module.exports = (env) => merge({
    entry: './src/index.tsx',
    output: require("./webpack/output")(env),
    module: require("./webpack/module")(env),
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html')
        }),
        new MiniCssExtractPlugin(),
        new webpack.DefinePlugin({
            APP_VERSION: JSON.stringify(packageJson.version)
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    optimization: require("./webpack/optimization")(env),
    devServer: require("./webpack/devServer")(env),
}, require("./webpack/common")(env));