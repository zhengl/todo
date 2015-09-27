jest.dontMock('../TodoDAO');

const request = require('axios');
const TodoDAO = require('../TodoDAO');
const TodoServerActions = require('../../actions/TodoServerActions');

describe('TodoDAO', () => {
	it('#fetchAll', () => {
		const data = [
			{
				id: '0001',
				content: 'Item 1'
			},
			{
				id: '0002',
				content: 'Item 2'
			},
			{
				id: '0003',
				content: 'Item 3'
			},
		];
		request.mockResponse(data);
		TodoDAO.fetchAll();
		expect(TodoServerActions.handleFetchAllSuccess).toBeCalled();
		expect(TodoServerActions.handleFetchAllSuccess.mock.calls[0][0]).toBe(data);
	});

	it('#add', () => {
		const data = 'new item';
		request.mockResponse(data);
		TodoDAO.add(data);
		expect(TodoServerActions.handleAddSuccess).toBeCalled();
		expect(TodoServerActions.handleAddSuccess.mock.calls[0][0]).toBe(data);
	});

	it('#remove', () => {
		const mockedResponse = [];
		const data = {
			id: '0001',
			content: 'Item 1'
		};

		request.mockResponse(mockedResponse);
		TodoDAO.remove(data);
		expect(TodoServerActions.handleRemoveSuccess).toBeCalled();
		expect(TodoServerActions.handleRemoveSuccess.mock.calls[0][0]).toBe(mockedResponse);
	});	
});