const path = require('path')
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
    ]

    if (env.production) {
        plugins.push(
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
                    test: /\.(js|jsx)?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: require.resolve('babel-loader'),
                            options: {
                                plugins: [
                                    !env.production &&
                                        require.resolve('react-refresh/babel'),
                                ].filter(Boolean),
                            },
                        },

                        {
                            loader: '@linaria/webpack-loader',
                            options: {
                                sourceMap: process.env.NODE_ENV !== 'production',
                            },
                        },
                    ],
                },
            ],
        },

        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                Components: path.resolve(__dirname, 'src/Components/'),
                Activities: path.resolve(__dirname, 'src/Activities/'),
                Screens: path.resolve(__dirname, 'src/Screens/'),
                Hooks: path.resolve(__dirname, 'src/Hooks/'),
                Context: path.resolve(__dirname, 'src/Context'),
                Utils: path.resolve(__dirname, 'src/Utils'),
                react: path.resolve('./node_modules/react'),
            },
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
                            passes: 3,
                        },
                    },
                }),
            ],
        },

        devtool: 'source-map',

        stats: {
            children: false,
        },

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
