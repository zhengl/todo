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

	it('calls TodoDAO.change on change', () => {
		let data = {
			id: '0001',
			content: 'new content'
		};
		TodoActions.change(data);
		expect(TodoDAO.change).toBeCalledWith(data);
	});	
});