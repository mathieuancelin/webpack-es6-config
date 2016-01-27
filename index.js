var webpack = require('webpack');

function isArray(obj) {
  if (Array.isArray) return Array.isArray(obj);
  return Object.prototype.toString.call(obj) === '[object Array]';
}

module.exports = function webpackES6Config(config) {
  if (!config) config = {};
  var filename = config.filename || 'app.js';
  var libraryName = config.libraryName || 'App';
  var entry = config.entry || ['./src/index.js'];
  var loaders = config.loaders || [];
  var extensions = config.extensions || [];
  var globalPlugins = config.plugins || [];
  var devPlugins = config.devPlugins || [];
  var prodPlugins = config.prodPlugins || [];

  if (!isArray(entry)) {
    entry = [entry];
  }

  var plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      '__DEV__': process.env.NODE_ENV === 'production' ? false : true,
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'dev')
      }
    })
  ].concat(globalPlugins);
  if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }));
    devPlugins.forEach(function(p) { plugins.push(p); });
  } else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new webpack.NoErrorsPlugin());
    devPlugins.forEach(function(p) { plugins.push(p); });
  }
  return {
    output: {
      path: './dist/',
      publicPath: '/dist/',
      filename: filename,
      library: libraryName,
      libraryTarget: 'umd'
    },
    devServer: {
      hot: true,
      inline: true,
      colors: true,
      contentBase: './public/',
    },
    entry: entry,
    resolve: {
      extensions: ['', '.js', '.jsx', 'es6'].concat(extensions)
    },
    module: {
      loaders: [
        {
          test: /\.js|\.jsx|\.es6$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ].concat(loaders)
    },
    plugins: plugins
  };
}
