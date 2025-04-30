const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    util: require.resolve("util/"),
    https: require.resolve("https-browserify"),
    http: require.resolve("stream-http"),
    os: require.resolve("os-browserify/browser"),
    path: require.resolve("path-browserify"),
    buffer: require.resolve("buffer/"),
    assert: require.resolve("assert/"),
    url: require.resolve("url/"),
    zlib: require.resolve("browserify-zlib"),
    process: require.resolve("process/browser.js") // ✅ with .js extension
  };

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser.js', // ✅ with .js extension
      Buffer: ['buffer', 'Buffer'],
    }),
  ];

  return config;
};
