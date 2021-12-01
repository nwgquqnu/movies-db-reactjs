const path = require('path');

const config = {
    dev: {
        filename: '[name]_bundle.js'
    },
    prod: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[contenthash]_bundle.js'
    }
};

module.exports = (env) => (config[env.environment] || {});
