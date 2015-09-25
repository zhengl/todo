import axios from 'axios';
import TodoServerActions from '../actions/TodoServerActions';

export default {
	fetchAll: () => {
		axios
			.get('http://localhost:3000/todos')
			.then((data) => TodoServerActions.handleFetchAllSuccess(data));
	}
}