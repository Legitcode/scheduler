var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    'basic': [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/only-dev-server',
      './example/basic.jsx'
    ]
  },
  output: {
    path: __dirname,
    filename: "[name].js",
    publicPath: 'http://localhost:8080/',
    chunkFilename: '[id].chunk.js',
    sourceMapFilename: '[name].map'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.es6'],
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [
      { test: /\.jsx$|\.es6$|\.js$/, loaders: ['react-hot', 'babel-loader?stage=0'], exclude: /node_modules/ },
      { test: /\.scss$|\.css$/, loader: 'style-loader!style!css!sass' },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'url?limit=10000!img?progressive=true' }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  devtool: "eval-source-map"
};
