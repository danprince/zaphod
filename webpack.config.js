module.exports = {
  entry: {
    index: __dirname + '/src/index.js'
  },
  output: {
    path: __dirname + '/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
};
