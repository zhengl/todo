import axios from 'axios';
import TodoServerActions from '../actions/TodoServerActions';
import constants from '../constants';

export default {
	fetchAll: () => {
		axios
			.get(`${constants.BASE_URL}/todos`)
			.then((res) => TodoServerActions.handleFetchAllSuccess(res.data));
	}
}