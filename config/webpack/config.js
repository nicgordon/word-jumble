const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const constants = require('./constants');

module.exports = {
  target: 'web',

  devtool: 'eval-cheap-source-map',

  entry: constants.CLIENT_DIR,

  output: {
    path: constants.DIST_DIR,
    filename: 'bundle.js',
    publicPath: '/assets/',
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.styl'],
    modulesDirectories: ['shared', 'node_modules'],
    root: constants.ROOT_DIR,
  },

  plugins: [
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      comments: false,
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.jsx*$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015', 'stage-1'],
        },
      },
      {
        test: /\.styl$/,
        loader: 'style!css?module&localIdentName=[path][name]---[local]---[hash:base64:5]!stylus',
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.txt?$/,
        exclude: /node_modules/,
        loader: 'raw',
      },
    ],
  },

  stylus: {
    import: [
      path.join(constants.SHARED_DIR, '/style/global/index.styl'),
    ],
  },
};
