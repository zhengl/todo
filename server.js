import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import uuid from 'node-uuid';

const database = {
	todos: [
		{
			id: uuid.v1(),
			content: 'Item 1'
		},
		{
			id: uuid.v1(),
			content: 'Item 2'
		}
	]
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

restfulServer.use(bodyParser.urlencoded({ extended: false }));

restfulServer.use(bodyParser.json());

restfulServer.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	next();
});

restfulServer.get('/todos', (req, res) => {
	res.json(database.todos);
});

restfulServer.post('/todos', (req, res) => {
	const newTodo = {
		id: uuid.v1(),
		content: req.body.todo
	};
	database.todos.unshift(newTodo);
	res.json(newTodo);
});

restfulServer.delete('/todos/:id', (req, res) => {
	database.todos = database.todos.filter( todo => todo.id != req.params.id );
	res.json(database.todos);
});

restfulServer.put('/todos/:id', (req, res) => {
	const todo = database.todos.find(todo => todo.id == req.params.id);
	todo.content = req.body.content;
	res.json(todo);
});

restfulServer.listen(REST_PORT, () => {
	console.log(`Restful Server is now running on http://localhost:${REST_PORT}`);
});