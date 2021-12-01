const { merge, mergeWithRules } = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mergeRules = mergeWithRules({
    use: {
        loader: "match",
        options: "merge",
    },
});

const cssLoaderConfig = {
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

const tsConfig = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: 'ts-loader'
};

const cssConfig = {
    test: /\.css$/i,
    use: [
        MiniCssExtractPlugin.loader,
        cssLoaderConfig
    ]
};

const sassConfig = {
    test: /\.s[ac]ss$/i,
    use: [
        MiniCssExtractPlugin.loader,
        cssLoaderConfig,
        "sass-loader"
    ]
};

const prodCssLoaderConfig = merge(cssLoaderConfig, { options: { modules: { localIdentName: "[hash:base64]" } } });

const config = {
    dev: {
        rules: [
            tsConfig,
            cssConfig,
            sassConfig
        ]
    },
    prod: {
        rules: [
            tsConfig,
            mergeRules(cssConfig, { use: [prodCssLoaderConfig] }),
            mergeRules(sassConfig, { use: [prodCssLoaderConfig] })
        ]
    }
};

module.exports = (env) => (config[env.environment] || {});