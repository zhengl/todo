jest.dontMock('../TodoDAO');

const request = require('axios');
const TodoDAO = require('../TodoDAO');
const TodoServerActions = require('../../actions/TodoServerActions');

describe('TodoDAO', () => {
	it('#fetchAll', () => {
		const data = [
			'Item 1',
			'Item 2',
			'Item 3',
		];
		request.mockResponse(data);
		TodoDAO.fetchAll();
		expect(TodoServerActions.handleFetchAllSuccess).toBeCalled();
		expect(TodoServerActions.handleFetchAllSuccess.mock.calls[0][0]).toBe(data);
	});
});