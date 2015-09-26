module.exports = {
	entry: './app/index.js',
	output: {
		path: __dirname + '/dist',
		filename: 'app.js'
	},
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: { stage: 0 } },
			{ test: /\.js$/, exclude: /node_modules/, loader: 'eslint'}
		]
	}
};