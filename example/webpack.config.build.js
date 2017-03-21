var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './basic.jsx',
  output: {
    path: __dirname,
    filename: "[name].js",
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.es6'],
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [
      { test: /\.jsx$|\.es6$|\.js$/, loaders: ['react-hot-loader', 'babel-loader?stage=0'], exclude: /node_modules/ },
      { test: /\.scss$|\.css$/, loader: 'style-loader!style!css!sass' },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'url?limit=10000!img?progressive=true' },
      { test: /\.json$/, loader: 'json' }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devtool: "eval-source-map"
};
