import AppDispatcher from '../dispatcher/AppDispatcher';
import constants from '../constants';

export default {
	handleFetchAllSuccess: (todos) => {
		AppDispatcher.dispatch({
			source: constants.FETCH_ALL_SUCCESS,
			todos: todos
		})
	}
}