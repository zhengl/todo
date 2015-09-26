import express from 'express';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const database = {
	todos: ['Item 1', 'Item 2']
}

const REST_PORT = 3000;
const APP_PORT = 8080;

import webpackConfig from './webpack.config';
const compiler = webpack(webpackConfig);

const app = new WebpackDevServer(compiler, {
  contentBase: 'public',
  hot: true,
  historyApiFallback: true,
  inline: true,
  stats: {colors: true}
});


app.listen(APP_PORT, () => {
	console.log(`App is now running on http://localhost:${APP_PORT}`);
});



const restfulServer = express();

restfulServer.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	next();
});

restfulServer.get('/todos', (req, res) => {
	res.json(database.todos);
});

restfulServer.listen(REST_PORT, () => {
	console.log(`Restful Server is now running on http://localhost:${REST_PORT}`);
});