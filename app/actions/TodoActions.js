import TodoDAO from '../dao/TodoDAO';

export default {
	fetchAll: () => TodoDAO.fetchAll(),
	add: (todo) => TodoDAO.add(todo),
	remove: (todo) => TodoDAO.remove(todo),
	change: (todo) => TodoDAO.change(todo)
}