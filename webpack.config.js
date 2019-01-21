const path = require('path');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');

const babel = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    presets: [
      'stage-0',
      'react',
      ['env', {
        'modules': false,
        'targets': {
          'browsers': ['last 2 versions']
        }
      }]
    ],
    plugins: [
      'babel-plugin-transform-decorators-legacy',
      'babel-plugin-transform-decorators',
      'transform-class-properties',
      'transform-react-remove-prop-types',
      [
        "react-remove-properties",
        {
          "properties": [
            "data-testid"
          ]
        }
      ]
    ]
  }
};

module.exports = (_, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: path.resolve(__dirname, isProduction  ? './src/Pagination.tsx' : './src/app.tsx'),
    output: {
      path: path.resolve('dist'),
      libraryTarget: "umd",
      filename: isProduction ? 'Pagination.js' : 'bundle.js',
    },
    devtool: false,
    resolve: {
      alias: {
        'assets': path.resolve(__dirname, './src/assets'),
      },
      extensions: ['.js', '.ts', '.tsx', '.less'],
      modules: ['node_modules'],
    },
    module: {
      rules: [
        // Rules for JS
        {
          test: /\.jsx?$/,
          loader: babel,
          exclude: '/node_modules/'
        },
        {
          test: /\.tsx?$/,
          exclude: /(node_modules|public\/)/,
          use: 'ts-loader'
        },
        // Rules for Style Sheets
        {
          test: /\.less$/,
          use: [
            MiniCss.loader,
            {
              loader: 'css-loader',
            },
            {
              loader: 'less-loader',
            }
          ],
          exclude: '/node_modules/'
        }]
    },
    externals: {
      ...(isProduction ? {
        react: {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react',
          umd: 'react',
        }
      } : {})
    },
    plugins: [
      ...(isProduction ? [
        new MiniCss({ filename: 'Pagination.css' }),
      ] : [
        new MiniCss({ filename: '[name].css' }),
        new HtmlWebpackPlugin({
          template: path.resolve('src/assets/index.html'),
          filename: 'index.html',
          inject: 'body'
        })
      ]),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/,
        cssProcessorOptions: {
          zindex: false,
          discardComments: { removeAll: true }
        }
      })
    ],
    devServer: {
      host: '0.0.0.0',
      port: process.env.npm_package_config_port || 8090,
    }
  }
};
