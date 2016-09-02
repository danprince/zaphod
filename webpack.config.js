const package = require('./package');

module.exports = {
  target: 'node',
  entry: {
    zaphod: [__dirname + '/src/index.js'],
    compat: __dirname + '/src/compat.js'
  },
  output: {
    path: __dirname + '/',
    filename: '[name].js',
    library: package.name,
    libraryTarget: 'umd',
    umdNamedDefine: true
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
