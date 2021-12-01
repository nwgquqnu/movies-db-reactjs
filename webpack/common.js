const config = {
    dev: {
        mode: 'development',
        devtool: 'inline-source-map'
    },
    prod: {
        mode: 'production',
        devtool: 'source-map',
    }
};
module.exports = (env) => (config[env.environment] || {});