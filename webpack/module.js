const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const tsLoaderConfig = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: 'ts-loader'
};

const miniCssExtractPluginConfig = {
    test: /\.css$/i,
    loader: MiniCssExtractPlugin.loader
};

const cssLoaderConfig = {
    test: /\.css$/i,
    loader: "css-loader",
    options: {
        esModule: true,
        modules: {
            mode: "local",
            auto: true,
            namedExport: true,
            localIdentName: "[path][name]__[local]--[hash:base64:5]",
        }
    }
};
const config = {
    dev: {
        rules: [
            tsLoaderConfig,
            miniCssExtractPluginConfig,
            cssLoaderConfig
        ]
    },
    prod: {
        rules: [
            tsLoaderConfig,
            miniCssExtractPluginConfig,
            merge(cssLoaderConfig, { options: { modules: { localIdentName: "[hash:base64]" } } })
        ]
    }
};

module.exports = (env) => (config[env.environment] || {});