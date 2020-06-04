const path = require('path');

// Plugins
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {DefinePlugin, BannerPlugin} = require("webpack");

// Variables
const sourcePath = path.join(__dirname, './src/');
const outPath = path.join(__dirname, `./dist/`);

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const buildDate = new Date();
  const {
    npm_package_name,
    npm_package_license,
    npm_package_version,
    npm_package_homepage,
    npm_package_repository_url
  } = process.env;

  return {
    context: sourcePath,
    entry: [
      'main.ts'
    ],
    output: {
      publicPath: '/',
      library: 'lib_demo',
      libraryTarget: 'umd',
      path: outPath,
      filename: isProduction ? '[name].js' : '[name].js',
      chunkFilename: isProduction ? 'chunks/[name].[contenthash].js' : 'chunks/[name].[hash].js'
    },
    target: 'node',
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
      plugins: [
        new TSConfigPathsPlugin()
      ],
      mainFields: ['module', 'browser', 'main']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ['ts-loader']
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new DefinePlugin({
        '__LIB_VERSION__': JSON.stringify({
          build: npm_package_version,
          date: buildDate.toISOString(),
          stamp: Math.floor(buildDate.getTime() / 1000)
        })
      }),
      new BannerPlugin(
        [
          npm_package_name,
          `Version: ${npm_package_version}`,
          `Build Date: ${buildDate.toISOString()}`,
          `License: ${npm_package_license}`,
          `Homepage: ${npm_package_homepage}`,
          `Repository: ${npm_package_repository_url}`
        ]
          .join('\n')
      )
    ],
    devtool: isProduction ? 'hidden-source-map' : 'cheap-module-eval-source-map'
  };
};
