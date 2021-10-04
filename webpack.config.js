const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var Visualizer = require('webpack-visualizer-plugin2');

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },

      {
        test: /\.scss$/,
        use: [
            MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: [
          "babel-loader",
          {
            loader: "react-svg-loader",
            options: {
              svgo: {
                plugins: [
                  { removeTitle: true }
                ],
                floatPrecision: 2
              }
            }
          }
        ]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    static: {
        directory: path.join(__dirname, 'public'),
    },
    port: 4200,
    hot: false,
    open: true
},
  plugins: [new Visualizer({
    filename: './statistics.html'
  }), new MiniCssExtractPlugin({filename: "style.css"})]
};