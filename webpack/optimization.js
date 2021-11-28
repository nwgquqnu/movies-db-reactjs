const config = {
    prod: {
        minimize: true,
        realContentHash: true,
    }
};
module.exports = (env) => (config[env.environment]);