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
        libraryTarget: 'umd',
        filename: env.prod ? 'Pagination.js' : 'bundle.js',
    } ,
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
                            loader: 'css-loader'
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
        new webpack.optimize.UglifyJsPlugin({ minimize: true }),
        ...(env.prod ? [
            new ExtractTextPlugin("Pagination.css")
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
