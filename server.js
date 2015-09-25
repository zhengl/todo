import express from 'express';

const app = express();

const database = {
	todos: ['Item 1', 'Item 2']
}

const APP_PORT = 3000;

app.get('/todos', (req, res) => {
	res.json(database.todos);
});

app.listen(APP_PORT, () => {
	console.log(`App is now running on http://localhost:${APP_PORT}`);
});