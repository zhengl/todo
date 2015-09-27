import TodoDAO from '../dao/TodoDAO';

export default {
	fetchAll: () => TodoDAO.fetchAll(),
	add: () => TodoDAO.add()
}