'use strict';

const webpackUtils = require('./webpack.utils');
const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

const currentDirectory = path.resolve(__dirname, '..');
const srcPath = path.resolve(currentDirectory, 'src');
const nodeModulesPath = path.resolve(currentDirectory, 'node_modules');
const indexHtmlPath = path.resolve(currentDirectory, 'index.html');
const buildPath = path.resolve(currentDirectory, 'dist');

module.exports = {
  devtool: 'source-map',
  entry: [
    require.resolve('webpack-dev-server/client') + '?http://localhost:8000',
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
    extensions: ['', '.js'],
    root: [
      path.resolve('./src')
    ],
    alias: {
      ChecklistActions: path.resolve('./src/redux/actions'),
      config: path.resolve('./webpack-config/env-configs/development')
    }
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
        loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap']
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
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=fonts/[name].[ext]'
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
      nodeModulesPath
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
    new CleanPlugin(['dist'], { root: currentDirectory }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"development"' }}),
    // Note: only CSS is currently hot reloaded
    new webpack.HotModuleReplacementPlugin()
  ]
};

if (webpackUtils.isWatching()) {
  const Dashboard = require('webpack-dashboard');
  const DashboardPlugin = require('webpack-dashboard/plugin');
  const dashboard = new Dashboard();
  module.exports.plugins.push(new DashboardPlugin(dashboard.setData));
}
