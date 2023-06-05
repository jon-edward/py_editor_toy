const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.ts",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  plugins: [
    new CopyPlugin({
      patterns: [{ to: "index.html", from: "index.html" }],
    }),

    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};
