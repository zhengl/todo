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

		dispatch({
			source: constants.FETCH_ALL_SUCCESS,
			todos: data
		});

		expect(TodoStore.getTodos()).toBe(data);
		expect(TodoStore.emitChange).toBeCalled();
	});

	it('adds todo to first on ADD_SUCCESS', () => {
		let size = TodoStore.getTodos().length;
		TodoStore.emitChange = jest.genMockFn();

		const data = [
			{
				id: '0004',
				content: 'Item 4'
			}
		];

		dispatch({
			source: constants.ADD_SUCCESS,
			todo: data
		});

		expect(TodoStore.getTodos().length).toBe(size + 1);
		expect(TodoStore.getTodos()[0]).toBe(data);
		expect(TodoStore.emitChange).toBeCalled();
	});

	it('sets todos on REMOVE_SUCCESS', () => {
		TodoStore.emitChange = jest.genMockFn();

		const data = [
			{
				id: '0002',
				content: 'Item 2'
			},
			{
				id: '0003',
				content: 'Item 3'
			},
		];

		dispatch({
			source: constants.REMOVE_SUCCESS,
			todos: data
		});

		expect(TodoStore.getTodos()).toBe(data);
		expect(TodoStore.emitChange).toBeCalled();
	});

	it('sets todo content on CHANGE_SUCCESS', () => {
		TodoStore.setTodos([
			{
				id: '0001',
				content: 'Item 1'
			}
		]);

		TodoStore.emitChange = jest.genMockFn();

		const updatedTodo = {
				id: '0001',
				content: 'new content'
		};
		dispatch({
			source: constants.CHANGE_SUCCESS,
			todo: updatedTodo
		});

		expect(TodoStore.getTodos().find(todo => todo.id == updatedTodo.id).content).toBe(updatedTodo.content);
	});	
});