const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CssoWebpackPlugin = require('csso-webpack-plugin').default
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default
const stylis = require('stylis')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
stylis.set({ prefix: false })
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { generate } = require('build-number-generator')

module.exports = (env) => {
    const plugins = [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public'),
                    to: path.resolve(__dirname, 'dist'),
                },
            ],
        }),
        new HtmlPlugin({
            template: './src/index.html',
            inject: 'body',
            scriptLoading: 'blocking',
        }),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(generate()),
            'process.env.NODE_ENV': JSON.stringify(
                env.production ? 'production' : 'development'
            ),
        }),
    ]

    if (env.production) {
        plugins.push(
            new BundleAnalyzerPlugin(),
            new CssoWebpackPlugin(),
            new CleanWebpackPlugin(),
            new HTMLInlineCSSWebpackPlugin()
        )
    } else {
        plugins.push(new ReactRefreshWebpackPlugin())
    }

    return {
        entry: './src/index.js',

        module: {
            rules: [
                {
                    test: /\.(scss|css)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                esModule: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                },
                {
                    test: /\.(js|jsx|ts|tsx)?$/,
                    exclude: /node_modules/,
                    use: [
                        'babel-loader',
                        {
                            loader: '@linaria/webpack-loader',
                            options: {
                                sourceMap: false,
                            },
                        },
                    ],
                },
            ],
        },

        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },

        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },

        optimization: {
            minimize: env.production,
            minimizer: [
                new TerserPlugin({
                    minify: TerserPlugin.uglifyJsMinify,
                    terserOptions: {
                        compress: {
                            varify: false,
                            passes: 3,
                        },
                    },
                }),
            ],
        },

        devtool: 'source-map',

        devServer: {
            static: {
                directory: path.resolve(__dirname, 'dist'),
            },
            port: 4200,
            hot: true,
        },

        plugins,
    }
}
