const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ProgressBar = require('progress-bar-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: {
        'main': path.join(__dirname, '../src/main.js')
    },
    output: {
        filename: 'static/js/[name].[hash:6].js',
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    hotReload: true
                }
            },
            {
                test: /\.css$/,
                loader: [
                    isDev ?
                        'vue-style-loader' :
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../../../'
                            }
                        },
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.styl(us)?$/,
                loader: [
                    isDev ? 'vue-style-loader' : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../../'
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.less$/,
                loader: [
                    isDev ? 'vue-style-loader' : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../../'
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        query: {
                            name: 'static/img/[name].[hash:6].[ext]',
                            limit: 10000,
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                            disable: isDev
                        }
                    }
                ]

            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 1000,
                    name: 'static/fonts/[name].[ext]',
                }
            },
        ]
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, '../src'),
            'view': path.join(__dirname, '../src/view'),
            'vue$': 'vue/dist/vue.esm.js',
            'utils': path.join(__dirname, '../src/utils'),
            'models': path.join(__dirname, '../src/models'),
            'assets': path.join(__dirname, '../src/assets'),
            '_c': path.join(__dirname, '../src/components')
        },
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/index.html'),
            chunksSortMode: 'none'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ProgressBar(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[hash:6].css",
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    }
};
