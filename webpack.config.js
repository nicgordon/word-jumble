var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
  entry: "./src",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel?stage=0' },
      { test: /\.css?$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]') }
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
  ],
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
