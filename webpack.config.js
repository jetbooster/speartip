const path = require("path");
const webpack = require("webpack"); // eslint-disable-line
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  // absolute path for project root
  context: path.resolve(__dirname, "src"),

  mode: process.env.NODE_ENV || "development",

  entry: {
    // relative path declaration
    app: "./index.js"
  },

  output: {
    // absolute path declaration
    path: path.resolve(__dirname, "dist"),
    filename: "./assets/js/[name].bundle.js",
    publicPath:'/'
  },

  module: {
    rules: [
      // babel-loader with 'env' preset
      {
        test: /\.(js|jsx)$/,
        include: /src/,
        exclude: /node_modules/,
        use: { loader: "babel-loader", options: { presets: ["env", "react", "stage-2"] } }
      },
      // html-loader
      { test: /\.html$/, use: ["html-loader"] },
      // sass-loader with sourceMap activated
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, "src", "assets", "scss")],
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      // file-loader(for images)
      {
        test: /\.(jpg|png|gif|svg|ico)$/,
        use: [{ loader: "file-loader", options: { name: "[name].[ext]", outputPath: "./assets/media/" } }]
      },
      // file-loader(for fonts)
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{ loader: "file-loader", options: { name: "[name].[ext]", outputPath: "./assets/fonts" } }]
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
      inject: "body"
    }),
    // extract-text-webpack-plugin instance
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],

  devServer: {
    // static files served from here
    contentBase: path.resolve(__dirname, "./dist/assets/media"),
    compress: true,
    // open app in localhost:2000
    port: 2000,
    stats: "errors-only",
    open: true,
    historyApiFallback: true,
  },

  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },

  devtool: "inline-source-map"
};

module.exports = config;
