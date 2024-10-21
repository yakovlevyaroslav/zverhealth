const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  output: {
    // filename: 'main.[contenthash].js',
    filename: 'js/main-v2.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimizer: [
      '...', // Это сохраняет стандартные минимизаторы
      new CssMinimizerPlugin(),
    ],
  },
});
