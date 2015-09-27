import axios from 'axios';
import TodoServerActions from '../actions/TodoServerActions';
import constants from '../constants';

export default {
	fetchAll: () => {
		axios
			.get(`${constants.BASE_URL}/todos`)
			.then((res) => TodoServerActions.handleFetchAllSuccess(res.data));
	},

	add: (todo) => {
		axios
			.post(`${constants.BASE_URL}/todos`, { todo: todo })
			.then((res) => TodoServerActions.handleAddSuccess(res.data));
	},

	remove: (todo) => {
		axios
			.delete(`${constants.BASE_URL}/todos/${todo.id}`)
			.then((res) => TodoServerActions.handleRemoveSuccess(res.data));		
	}
}