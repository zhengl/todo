import AppDispatcher from '../dispatcher/AppDispatcher';
import constants from '../constants';

export default {
	handleFetchAllSuccess: (todos) => {
		AppDispatcher.dispatch({
			source: constants.FETCH_ALL_SUCCESS,
			todos: todos
		})
	},

	handleAddSuccess: (todo) => {
		AppDispatcher.dispatch({
			source: constants.ADD_SUCCESS,
			todo: todo
		})		
	},

	handleRemoveSuccess: (todos) => {
		AppDispatcher.dispatch({
			source: constants.REMOVE_SUCCESS,
			todos: todos
		})
	}
}