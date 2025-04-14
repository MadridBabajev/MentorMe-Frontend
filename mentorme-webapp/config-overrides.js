const webpack = require('webpack');

module.exports = function override(config, env) {
    // Provide fallback for Node modules
    config.resolve.fallback = {
        ...config.resolve.fallback,
        path: require.resolve('path-browserify'),
        fs: false,
        crypto: false,
    };

    return config;
};
