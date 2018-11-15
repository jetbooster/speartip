const path = require('path');
const webpack = require("webpack"); // eslint-disable-line
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const config = {
  // absolute path for project root
  context: path.resolve(__dirname, 'src'),

  mode: process.env.NODE_ENV || 'development',

  entry: {
    // relative path declaration
    app: './index.js',
  },

  output: {
    // absolute path declaration
    path: path.resolve(__dirname, 'dist'),
    filename: './assets/js/[name].bundle.js',
    publicPath: '/',
  },

  module: {
    rules: [
      // babel-loader with 'env' preset
      {
        test: /\.(js|jsx)$/,
        include: /src/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader', options: { presets: ['env', 'react', 'stage-2'] } },
      },
      // html-loader
      { test: /\.html$/, use: ['html-loader'] },
      // sass-loader with sourceMap activated
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, 'src', 'assets', 'scss')],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // file-loader(for images)
      {
        test: /\.(jpg|png|gif|svg|ico)$/,
        use: [{ loader: 'file-loader', options: { name: '[name].[ext]', outputPath: './assets/media/' } }],
      },
      // file-loader(for fonts)
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{ loader: 'file-loader', options: { name: '[name].[ext]', outputPath: './assets/fonts' } }],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    // extract-text-webpack-plugin instance
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new Dotenv(),
  ],

  devServer: {
    // static files served from here
    contentBase: path.resolve(__dirname, './dist/assets/media'),
    compress: true,
    // open app in localhost:2000
    port: 2000,
    stats: 'errors-only',
    open: true,
    historyApiFallback: true,
  },

  optimization: {
    minimize: true,
    runtimeChunk: true,
    splitChunks: {
      chunks: 'async',
      minSize: 1000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    },
  },

  devtool: 'inline-source-map',
};

module.exports = config;
