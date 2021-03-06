import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import WebpackDevServer from 'webpack-dev-server';
import uuid from 'node-uuid';

const database = {
  todos: [
    {
      id: uuid.v1(),
      content: 'Item 1',
    },
    {
      id: uuid.v1(),
      content: 'Item 2',
    },
  ],
};

const SERVER_PORT = 3000;
const APP_PORT = 8080;

webpackConfig.entry.unshift(`webpack-dev-server/client?http://localhost:${APP_PORT}`, 'webpack/hot/dev-server');
const compiler = webpack(webpackConfig);

const app = new WebpackDevServer(compiler, {
  contentBase: 'public',
  hot: true,
  historyApiFallback: true,
  inline: true,
  stats: {colors: true},
  proxy: {
    '/todos*': `http://localhost:${SERVER_PORT}`,
  },
});

app.listen(APP_PORT, () => {
/* eslint-disable no-console */
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));

server.use(bodyParser.json());

server.get('/todos', (req, res) => {
  res.json(database.todos);
});

server.post('/todos', (req, res) => {
  const newTodo = {
    id: uuid.v1(),
    content: req.body.todo,
  };
  database.todos.unshift(newTodo);
  res.json(newTodo);
});

server.delete('/todos/:id', (req, res) => {
  database.todos = database.todos.filter( todo => todo.id !== req.params.id );
  res.json(database.todos);
});

server.put('/todos/:id', (req, res) => {
  const targetTodo = database.todos.find(todo => todo.id === req.params.id);
  targetTodo.content = req.body.content;
  res.json(targetTodo);
});

server.listen(SERVER_PORT, () => {
/* eslint-disable no-console */
  console.log(`Server is now running on http://localhost:${SERVER_PORT}`);
});
