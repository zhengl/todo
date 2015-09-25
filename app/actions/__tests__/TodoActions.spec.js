jest.dontMock('../TodoActions');

const TodoDAO = require('../../dao/TodoDAO');
const TodoActions = require('../TodoActions');

describe('TodoActions', () => {
	it('calls TodoDAO.fetchAll on fetchAll', () => {
		TodoActions.fetchAll();
		expect(TodoDAO.fetchAll).toBeCalled();
	});
});