import axios from 'axios';
import TodoServerActions from '../actions/TodoServerActions';
import constants from '../constants';

export default {
	fetchAll: () => {
		axios
			.get(`${constants.BASE_URL}/todos`)
			.then((data) => TodoServerActions.handleFetchAllSuccess(data));
	}
}