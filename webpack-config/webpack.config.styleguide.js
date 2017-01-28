'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard();

const currentDirectory = path.resolve(__dirname, '..');
const srcPath = path.resolve(currentDirectory, 'src/styles/custom-bootstrap/styleguide');
const nodeModulesPath = path.resolve(currentDirectory, 'node_modules');
const indexHtmlPath = path.resolve(currentDirectory, 'index.html');
const buildPath = path.resolve(currentDirectory, 'dist');

module.exports = {
  devtool: 'source-map',
  entry: [
    require.resolve('webpack-dev-server/client') + '?http://localhost:4000/',
    require.resolve('webpack/hot/dev-server'),
    path.join(srcPath, 'index')
  ],
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: buildPath,
    pathinfo: true,
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js']
  },
  resolveLoader: {
    root: nodeModulesPath,
    moduleTemplates: ['*-loader']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: srcPath,
        loader: 'babel',
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.(scss|css)$/,
        include: srcPath,
        loader: 'style!css!postcss!sass'
      },
      {
        test: /\.ya?ml$/,
        loader: 'json!yaml'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        exclude: /node_modules/,
        loader: 'url?limit=1000'
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file'
      },
      {
        test: /\.svg$/,
        loader: 'raw!svgo?' + require('./svgstore.options')
      },
      {
        test: /\.(mp4|webm)$/,
        loader: 'url?limit=10000'
      }
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, '../node_modules')
    ]
  },
  postcss() {
    return [autoprefixer];
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: indexHtmlPath
    }),
    new DashboardPlugin(dashboard.setData),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"styleguide"' }),
    // Note: only CSS is currently hot reloaded
    new webpack.HotModuleReplacementPlugin()
  ]
};
