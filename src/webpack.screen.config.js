const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'views/screen/main.js'),
  output: {
    path: path.resolve(__dirname, 'static/screen/js/'),
    filename: 'bundle.js'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'views/screen/')
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
  }
};