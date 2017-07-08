var path = require('path');
var webpack = require('webpack');

var root = __dirname;

module.exports = {
	entry: {
        buildAlert: './src/client/routes/routes.js',
	},
	output: {
		path: path.join(__dirname,'public/js'),
		filename: '[name].js',
	},

	module: {
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react'],
					plugins: ['transform-decorators-legacy']
				}
			},
			{
				test: /\.scss$/,
				loaders: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	},
	devtool: 'sourcemap',
};