const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    // filename: 'js/[name].[contenthash].js',
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    // assetModuleFilename: 'images/[hash][ext][query]',
    assetModuleFilename: 'images/[name][ext][query]',
    clean: true,
  },
  mode: 'development', // Измените на 'production' для продакшн сборки
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    hot: true,               // Hot Module Replacement
    liveReload: true,        // Автоперезагрузка страницы
    open: true,              // Автооткрытие браузера
    watchFiles: ['src/**/*'], // Следим за файлами в папке src
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // filename: 'css/[name].[contenthash].css',
      filename: 'css/main-v1.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
};
