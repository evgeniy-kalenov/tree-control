const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/* Styled components */
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();

const isDev = process.env.NODE_ENV === 'development';

const optimization = () => {
    const config = {
        splitChunks: {
            name: false,
        },
    };
    if (!isDev) {
        config.minimize = true;
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(), /* Минимизирует CSS */
            new TerserWebpackPlugin(), /* Минимизирует JS */
        ];
    }
    return config;
};

module.exports = {
    entry: {
        main: ['./src/index.tsx'],
    },
    output: {
        path: `${ __dirname }/dist`,
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    externals: {
        React: 'react',
        ReactDOM: 'react-dom'
    },
    watch: false,
    devtool: isDev ? 'eval' : 'cheap-source-map',
    module: {
        rules: [
            {
                test: /\.(tsx|jsx|ts)$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'ts-loader' }
                ],
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            esModule: true,
                            reloadAll: true
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { hmr: isDev, reloadAll: true }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: { localIdentName: '[name]__[local]--[hash:base64:5]' }
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: { strictMath: true, noIeCompat: true },
                        }
                    }
                ]
            },
            {
                test: require.resolve('jquery'),
                use: [
                    { loader: 'expose-loader', options: 'jQuery' },
                    { loader: 'expose-loader', options: '$' },
                ],
            }
        ]
    },
    plugins: [
        /* Управляет шаблоном html */
        new HtmlWebpackPlugin({
            template: './template.html',
            filename: 'index.html',
        }),
        /* Определяет среду разработки */
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        /* Чистит папку dist */
        new CleanWebpackPlugin(),
        /* Извлекает стили в отдельный файл, расставляет префиксы */
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        })
    ],
    resolve: {
        extensions: ['*', '.js', '.tsx', '.jsx', '.ts']
    },
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        port: 3000
    },
    optimization: optimization()
};