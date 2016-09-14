const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const hmrPlugin = new webpack.HotModuleReplacementPlugin();

const htmlPlugin = new HtmlWebpackPlugin({
  template: './src/index.html',
  chunksSortMode: 'dependency'
});

const definePlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    HMR: JSON.stringify(process.env.HMR)
  }
});

const METADATA = {
  title: 'elmbp'
};

const config = {
  metadata: METADATA,
  entry: {
    main: './src/index.js'
  },
  output: {
    path: './dist',
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.elm$/,
        loader: 'elm-hot!elm-webpack',
        exclude: [/elm-stuff/, /node_modules/]
      }
    ],
    noParse: /\.elm$/
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.elm']
  },
  devServer: {
    contentBase: './dist',
    inline: true,
    stats: 'errors-only'
  }
};

const plugins = [];

plugins.push(definePlugin);

plugins.push(htmlPlugin);

if (process.env.HMR === 'enabled') {
  plugins.push(hmrPlugin);
  config.devServer.hot = true;
}

config.plugins = plugins.slice();

module.exports = config;
