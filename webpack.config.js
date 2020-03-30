const path = require('path');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './src/cli.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          { loader: "babel-loader" },
          { loader: "ts-loader" }
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts', '.js', '.json'
    ]
  },
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'dist')
  }
};