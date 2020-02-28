const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'views/controller/main.js'),
  output: {
    path: path.resolve(__dirname, 'static/controller/'),
    filename: 'bundle.js'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'views/controller/')
    ],
    extensions: ['.js', '.json', '.jsx']
  },
  module: {
    rules: [
      { test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
};