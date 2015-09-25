jest.dontMock('../TodoServerActions');

const AppDispatcher = require('../../dispatcher/AppDispatcher');
const TodoServerActions = require('../TodoServerActions');
const constants = require('../../constants');

describe('TodoServerActions', () => {
	it('dispatches FETCH_ALL_SUCCESS on handling fetch all success', () => {
		const data = [
			'Item 1',
			'Item 2',
			'Item 3'
		];
		TodoServerActions.handleFetchAllSuccess(data);
		expect(AppDispatcher.dispatch).toBeCalledWith({
			source: constants.FETCH_ALL_SUCCESS,
			todos: data
		});
	});
});