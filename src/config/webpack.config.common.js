var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var helpers = require("./helpers");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    polyfills: "./src/polyfills.ts",
    vendor: "./src/vendor.ts",
    app: "./src/main.ts",
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: "awesome-typescript-loader",
            options: { configFileName: helpers.root("src", "tsconfig.json") },
          },
          "angular2-template-loader",
          "angular-router-loader",
        ],
        exclude: [/node_modules/],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: "file-loader?name=assets/[name].[hash].[ext]",
      },
      {
        test: /\.css$/,
        exclude: helpers.root("src", "app"),
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.css$/,
        include: helpers.root("src", "app"),
        loader: "raw-loader",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
};
