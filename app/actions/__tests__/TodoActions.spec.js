jest.dontMock('../TodoActions');

const TodoDAO = require('../../dao/TodoDAO');
const TodoActions = require('../TodoActions');

describe('TodoActions', () => {
	it('calls TodoDAO.fetchAll on fetchAll', () => {
		TodoActions.fetchAll();
		expect(TodoDAO.fetchAll).toBeCalled();
	});

	it('calls TodoDAO.add on add', () => {
		let data = 'new item';
		TodoActions.add(data);
		expect(TodoDAO.add).toBeCalledWith(data);
	});

	it('calls TodoDAO.remove on remove', () => {
		let data = 'new item';
		TodoActions.remove(data);
		expect(TodoDAO.remove).toBeCalledWith(data);
	});
});