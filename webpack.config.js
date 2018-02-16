const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => ({
    target: 'web',
    context: path.resolve('src'),
    entry: env.prod ? './pagination.tsx' : './test.tsx',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js',
    } ,
    devtool: env.prod ? 'source-map' : 'eval',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
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
        ...(env.prod ? [
            new webpack.optimize.UglifyJsPlugin({
                compressor: {
                    pure_getters: true,
                    unsafe: true,
                    unsafe_comps: true,
                    warnings: false,
                },
                output: {
                    comments: false,
                },
                sourceMap: false,
            })
        ] : [
            new ExtractTextPlugin('[name].css'),
            new HtmlWebpackPlugin({
                template: path.resolve('src/assets/index.html'),
                filename: 'index.html',
                inject: 'body'
            })
        ])
    ]
});
