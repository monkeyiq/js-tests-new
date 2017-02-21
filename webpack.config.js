const { resolve } = require('path');
const router = require('./src/router');
const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?/',
    'webpack/hot/only-dev-server',
    './src/client/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'src'),
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'src/client'),
    publicPath: '/',
    host: '0.0.0.0',
    port: 3000,
    setup: router,
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loaders: [
          'babel-loader',
          'eslint-loader',
        ],
        test: /\.js$/,
      },
    ],
  },
  performance: {
    hints: process.env.NODE_ENV === 'production',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};
