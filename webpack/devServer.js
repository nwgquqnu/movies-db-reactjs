const config = {
    dev: {
        historyApiFallback: true,
    },
};
module.exports = (env) => (config[env.environment] || {});