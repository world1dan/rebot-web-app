const path = require("path")
const HtmlPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")



module.exports = (env) => {

    return {
        entry: "./src/index.js",

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        MiniCssExtractPlugin.loader, "css-loader", "sass-loader"
                    ]
                }
            ]
        },

        resolve: { extensions: [".js", ".jsx"] },

        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "dist")
        },

        optimization: {
            minimize: env.production,
            minimizer: [new TerserPlugin({
                minify: TerserPlugin.uglifyJsMinify
            })]
        },

    
        devtool: false,
        devServer: {
            static: {
                directory: path.resolve(__dirname, "dist"),
            },
            port: 4200,
            open: true,
            hot: true
        },


        plugins: [
            new MiniCssExtractPlugin({ filename: "style.css" }),
            new CopyPlugin({
                patterns: [{
                    from: path.resolve(__dirname, "public"),
                    to: path.resolve(__dirname, "dist"),
                }]
            }),
            new HtmlPlugin({
                template: "./src/index.html"
            }),
            new CleanWebpackPlugin()
        ]
    }
}