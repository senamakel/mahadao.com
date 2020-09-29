const Path = require('path');
const Webpack = require('webpack');
const { merge } = require('webpack-merge');
const StylelintPlugin = require('stylelint-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  output: {
    chunkFilename: 'js/[name].chunk.js'
  },
  devServer: {
    contentBase: Path.join(__dirname, '../src'),
    watchContentBase: true,

    inline: true,
    hot: true
  },
  plugins: [
    new LiveReloadPlugin({}),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new StylelintPlugin({
      files: Path.join('src', '**/*.s?(a|c)ss')
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, '../src'),
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true
        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, '../src'),
        loader: 'babel-loader'
      },
      {
        test: /\.sass$/i,
        use: ['style-loader', 'css-loader?sourceMap=true', 'sass-loader']
      }
    ]
  }
});
