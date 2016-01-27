var config = require('./index');

var conf = config({
  filename: 'my-cool-app.js',
  libraryName: 'MyCoolApp',
  entry: './src/main.js',
});

console.log(conf);
