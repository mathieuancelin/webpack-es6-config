# webpack-es6-config

A simple tool to create ES6 enabled webpack config

```
npm install --save-dev webpack-es6-config
```

You *must have* `webpack` and `babel-loader` already installed.


Then in your `webpack.config.js` file, add the following

```javascript
var config = require('webpack-es6-config');

module.exports = config({
  filename: 'my-cool-app.js',
  libraryName: 'MyCoolApp',
  entry: './src/main.js',
});
```

it will be equivalent to

```javascript
var webpack = require('webpack');

var plugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    '__DEV__': process.env.NODE_ENV === 'production' ? false : true,
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'dev')
    }
  })
];
if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false
    }
  }));
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new webpack.NoErrorsPlugin());
}

module.exports = {
  output: {
    path: './dist/',
    publicPath: '/dist/',
    filename: 'my-cool-app.js',
    library: 'MyCoolApp',
    libraryTarget: 'umd'
  },
  devServer: {
    contentBase: './public/',
  },
  entry: [
    './src/main.js'
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', 'es6']
  },
  module: {
    loaders: [
      {
        test: /\.js|\.jsx|\.es6$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: plugins
};
```
possible configs are :

```javascript
{
  filename: 'app.js', // name of the dist file
  libraryName: 'App', // global name of the library
  entry: './src/index.js', // entry point (can be an array)
  loaders: [], // loaders other than babel-loader
  extensions: [], // file extension to load with babel-loader
  globalPlugins: [], // plugins to add globally
  devPlugins: [], // plugins to add only in dev mode
  prodPlugins: [] // plugins to add only in prod mode
}
```
