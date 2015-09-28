var webpack = require('webpack');

module.exports = {
	entry: './app/index.js',
	output: {
		path: __dirname + '/public',
		filename: 'app.js'
	},
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: { stage: 0 } },
			{ test: /\.js$/, exclude: /node_modules/, loader: 'eslint'},
			{ test: /\.css$/, loader: 'style!css'},
			{ test: /\.svg$/, loader: 'raw'},
		]
	}
};