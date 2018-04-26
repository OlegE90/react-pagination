const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => ({
  target: 'web',
  context: path.resolve('src'),
  entry: env.prod ? './pagination.tsx' : './app.tsx',
  output: {
    path: path.resolve('dist'),
    libraryTarget: 'umd',
    filename: env.prod ? 'Pagination.js' : 'bundle.js',
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  devtool: env.prod ? 'source-map' : 'eval',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: ['node_modules', 'src'],
  },
  module: {
    rules: [
      // Rules for JS
      {
        test: /\.(jsx|js|tsx?)$/,
        rules: [
          {
            loader: 'babel-loader',
            include: [
              path.resolve('src')
            ],
            options: {
              babelrc: false,
              presets: [
                'es2015',
                'react'
              ]
            }
          },
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: 'ts-loader'
          }
        ]
      },
      // Rules for Style Sheets
      {
        test: /\.(css|less)$/,
        rules: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'less-loader',
            }
          ]

        })
      }]
  },
  plugins: [
    ...(env.prod ? [
      new webpack.optimize.UglifyJsPlugin({ minimize: true }),
      new ExtractTextPlugin("Pagination.css")
    ] : [
      new ExtractTextPlugin('[name].css'),
      new HtmlWebpackPlugin({
        template: path.resolve('src/assets/index.html'),
        filename: 'index.html',
        inject: 'body'
      })
    ])
  ],
  devServer: {
    host: 'localhost',
    port: process.env.npm_package_config_port || 8090,
  }
});
