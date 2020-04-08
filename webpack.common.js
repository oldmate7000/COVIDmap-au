const path = require('path');
var HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

//if you're seeing this and wondering why such a simple project requires a module bundler
//well - it's for the experience of it on my part

module.exports = {
  context: path.join(__dirname, './app'),
  entry: {
    index: './src/index.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  plugins: [
  new HtmlWebpackPlugin({
    template: "./src/index.html"
  }),
  new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ["@babel/plugin-proposal-object-rest-spread"]
        },
        exclude: /node_modules/,
        include: path.join(__dirname, './app/src'),
      },
      {
        test: /\.css$/,
        loader: [MiniCssExtractPlugin.loader, 'css-loader'],
        exclude: /node_modules/,
        include: path.join(__dirname, './app/src'),
      }
    ]
  },
};