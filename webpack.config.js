var path = require('path');

module.exports = {
  entry: "./src",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel?stage=0',
    }],
  },
  resolve: {
    root: __dirname,
    modulesDirectories: [ 'node_modules' ],
    extensions: [ '', '.js', '.jsx' ],
    alias: {},
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
    alias: {},
  }
};
