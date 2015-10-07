jest.dontMock('../TodoActions');

const TodoDao = require('../../dao/TodoDao');
const TodoActions = require('../TodoActions');

describe('TodoActions', () => {
  it('calls TodoDao.fetchAll on fetchAll', () => {
    TodoActions.fetchAll();
    expect(TodoDao.fetchAll).toBeCalled();
  });

  it('calls TodoDao.add on add', () => {
    const data = 'new item';
    TodoActions.add(data);
    expect(TodoDao.add).toBeCalledWith(data);
  });

  it('calls TodoDao.remove on remove', () => {
    const data = 'new item';
    TodoActions.remove(data);
    expect(TodoDao.remove).toBeCalledWith(data);
  });

  it('calls TodoDao.change on change', () => {
    const data = {
      id: '0001',
      content: 'new content',
    };
    TodoActions.change(data);
    expect(TodoDao.change).toBeCalledWith(data);
  });
});
