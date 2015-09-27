jest.dontMock('../TodoStore');

const TodoStore = require('../TodoStore');
const AppDispatcher = require('../../dispatcher/AppDispatcher');
const constants = require('../../constants');

describe('TodoStore', () => {
	let dispatch;

	beforeEach(() => {
		dispatch = AppDispatcher.register.mock.calls[0][0];
	});

	it('sets todos on FETCH_ALL_SUCCESS', () => {
		TodoStore.emitChange = jest.genMockFn();

		const data = [
			'Item 1',
			'Item 2',
			'Item 3',
		];

		dispatch({
			source: constants.FETCH_ALL_SUCCESS,
			todos: data
		});

		expect(TodoStore.getTodos()).toBe(data);
		expect(TodoStore.emitChange).toBeCalled();
	});

	it('sets todos on ADD_SUCCESS', () => {
		let size = TodoStore.getTodos().length;
		TodoStore.emitChange = jest.genMockFn();

		const data = 'new item';

		dispatch({
			source: constants.ADD_SUCCESS,
			todo: data
		});

		expect(TodoStore.getTodos().length).toBe(size + 1);
		expect(TodoStore.getTodos().pop()).toBe(data);
		expect(TodoStore.emitChange).toBeCalled();
	});	
});