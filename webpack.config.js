const path = require('path')

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, './src/index.ts'),
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    library: ['PaperEditor'],
    path: path.join(__dirname, './lib'),
    filename: 'paper-editor.js',
  },
}
