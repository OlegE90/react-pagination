const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => ({
    target: 'web',
    context: path.resolve('src'),
    entry: './main.tsx',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    } ,
    devtool: env.prod ? 'source-map' : 'eval',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        // Allow absolute paths in imports, e.g. import Button from 'components/Button'
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
                test: /\.(css|less|styl|scss|sass|sss)$/,
                rules: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        // Apply PostCSS plugins including autoprefixer
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: './tools/postcss.config.js',
                                },
                            },
                        },
                        {
                            test: /\.css$/,
                            include: path.resolve('src'),
                            loader: 'css-loader',
                            options: {
                                // CSS Loader https://github.com/webpack/css-loader
                                importLoaders: 1,
                                sourceMap: env.dev,
                                // CSS Modules https://github.com/css-modules/css-modules
                                modules: true,
                                localIdentName: env.dev
                                    ? '[name]-[local]-[hash:base64:5]'
                                    : '[hash:base64:5]',
                                // CSS Nano http://cssnano.co/
                                minimize: env.dev ? false : {
                                    discardComments: {removeAll: true},
                                }
                            },
                        },
                        {
                            test: /\.less$/,
                            loader: 'less-loader',
                        }
                    ]
                    
                })
            }]
    },
    plugins: [
        new ExtractTextPlugin('[name].[contenthash].css'),
        new HtmlWebpackPlugin({
            template: path.resolve('src/assets/index.html'),
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify("5fa3b9")
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: "vendor.js",
            minChunks: module => /node_modules/.test(module.resource),
        }),
        ...(env.prod ? [] : [
            // https://github.com/webpack/webpack/blob/master/examples/scope-hoisting/README.md
            new webpack.optimize.ModuleConcatenationPlugin(),
            // https://github.com/mishoo/UglifyJS2#compressor-options
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    unused: true,
                    dead_code: true,
                    screw_ie8: true,
                },
                mangle: {
                    screw_ie8: true,
                },
                output: {
                    comments: false,
                    screw_ie8: true,
                },
                sourceMap: true,
            }),
        ])
    ]
});
