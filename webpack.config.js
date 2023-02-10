const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const HtmlWebpackInjector = require('html-webpack-injector');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js?t=' + new Date().getTime(),
    // chunkFilename: '[name]-chunk.js?t=' + new Date().getTime(),
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "./index.html",
      chunks: ["main"]
    }),
    new HtmlWebpackInjector(),
    new FaviconsWebpackPlugin({
      logo: 'assets/favicon/woodyhi.png',
    }),
  ],
};