const path = require('path');
const webpack = require('webpack')

const rules = [{
  test: /\.(js|jsx|ts)$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  options: {
    presets: ['@babel/react', '@babel/env']
  }
  },

  {
    test: /\.s[ac]ss$/i,
    use: [
      "style-loader",
      "css-loader",
      "sass-loader"
    ]
  }
];


module.exports = {
  mode: process.env.NODE_ENV,
  entry : path.resolve(__dirname, './client/index.js'), 
  output:{
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules
  },
  
  devServer: {

    publicPath: '/build',
    proxy: {
      '/api': 'http://localhost:3000/'
    },
  }

};