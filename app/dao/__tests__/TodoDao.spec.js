jest.dontMock('../TodoDao');

const request = require('axios');
const TodoDao = require('../TodoDao');
const TodoServerActions = require('../../actions/TodoServerActions');

describe('TodoDao', () => {
  it('#fetchAll', () => {
    const data = [
      {
        id: '0001',
        content: 'Item 1',
      },
      {
        id: '0002',
        content: 'Item 2',
      },
      {
        id: '0003',
        content: 'Item 3',
      },
    ];
    request.mockResponse(data);
    TodoDao.fetchAll();
    expect(TodoServerActions.handleFetchAllSuccess).toBeCalledWith(data);
  });

  it('#add', () => {
    const data = 'new item';
    request.mockResponse(data);
    TodoDao.add(data);
    expect(TodoServerActions.handleAddSuccess).toBeCalledWith(data);
  });

  it('#remove', () => {
    const mockedResponse = [];
    const data = {
      id: '0001',
      content: 'Item 1',
    };

    request.mockResponse(mockedResponse);
    TodoDao.remove(data);
    expect(TodoServerActions.handleRemoveSuccess).toBeCalledWith(mockedResponse);
  });

  it('#remove', () => {
    const mockedResponse = {
      id: '0001',
      content: 'new content',
    };
    const data = mockedResponse;

    request.mockResponse(mockedResponse);
    TodoDao.change(data);
    expect(TodoServerActions.handleChangeSuccess).toBeCalledWith(mockedResponse);
  });
});
