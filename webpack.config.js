const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

function pyodideScripts() {
  const requiredScripts = [
    "package.json",
    "pyodide.asm.js",
    "pyodide.asm.wasm",
    "repodata.json",
    "python_stdlib.zip",
  ];

  return requiredScripts.map((name) => {
    return {
      to: path.join("pyodide", name),
      from: path.join("node_modules", "pyodide", name),
    };
  });
}

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
      patterns: pyodideScripts(),
    }),

    new HtmlWebpackPlugin({
      template: "index.html",
    }),

    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};
