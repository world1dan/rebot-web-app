const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HTMLInlineCSSWebpackPlugin =
    require('html-inline-css-webpack-plugin').default
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const BundleAnalyzerPlugin =
    require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const Dotenv = require('dotenv-webpack')
const stylis = require('stylis')
stylis.set({ prefix: false })

const getPlugins = (isProduction) => {
    const plugins = [
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(
                isProduction ? 'production' : 'development'
            ),
        }),
        new HtmlPlugin({
            template: './src/index.html',
            inject: 'body',
            scriptLoading: 'blocking',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public'),
                    to: path.resolve(__dirname, 'dist'),
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
        new Dotenv({
            path: './.env', // Path to .env file (this is the default)
            safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
        }),
    ]

    if (isProduction) {
        plugins.push(
            new CleanWebpackPlugin(),
            new HTMLInlineCSSWebpackPlugin(),
            new BundleAnalyzerPlugin()
        )
    } else {
        plugins.push(new ReactRefreshWebpackPlugin())
    }

    return plugins
}

module.exports = (env) => {
    const isProduction = env.production === true

    return {
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },

        plugins: getPlugins(isProduction),

        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)?$/,
                    exclude: /node_modules/,
                    use: ['babel-loader', '@linaria/webpack-loader'],
                },
                {
                    test: /\.(scss|css)$/,
                    exclude: /node_modules/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.svg$/,
                    exclude: /node_modules/,
                    use: ['svg-url-loader', 'svgo-loader'],
                },
            ],
        },

        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },

        optimization: {
            minimize: isProduction,
            minimizer: [
                new TerserPlugin({
                    minify: TerserPlugin.uglifyJsMinify,
                    terserOptions: {
                        compress: {
                            varify: false,
                            passes: 2,
                        },
                    },
                }),
            ],
        },

        devtool: false,

        devServer: {
            port: 4200,
            static: {
                directory: path.resolve(__dirname, 'dist'),
            },
        },
    }
}
