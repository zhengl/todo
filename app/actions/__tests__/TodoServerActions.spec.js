jest.dontMock('../TodoServerActions');

const AppDispatcher = require('../../dispatcher/AppDispatcher');
const TodoServerActions = require('../TodoServerActions');
const constants = require('../../constants');

describe('TodoServerActions', () => {
  it('dispatches FETCH_ALL_SUCCESS on handling fetch all success', () => {
    const data = [
      'Item 1',
      'Item 2',
      'Item 3',
    ];
    TodoServerActions.handleFetchAllSuccess(data);
    expect(AppDispatcher.dispatch).toBeCalledWith({
      source: constants.FETCH_ALL_SUCCESS,
      todos: data,
    });
  });

  it('dispatches ADD_SUCCESS on handling add success', () => {
    const data = 'new item';
    TodoServerActions.handleAddSuccess(data);
    expect(AppDispatcher.dispatch).toBeCalledWith({
      source: constants.ADD_SUCCESS,
      todo: data,
    });
  });

  it('dispatches REMOVE_SUCCESS on handling remove success', () => {
    const data = [];
    TodoServerActions.handleRemoveSuccess(data);
    expect(AppDispatcher.dispatch).toBeCalledWith({
      source: constants.REMOVE_SUCCESS,
      todos: data,
    });
  });

  it('dispatches CHANGE_SUCCESS on handling change success', () => {
    const data = {
      id: '0001',
      content: 'new content',
    };
    TodoServerActions.handleChangeSuccess(data);
    expect(AppDispatcher.dispatch).toBeCalledWith({
      source: constants.CHANGE_SUCCESS,
      todo: data,
    });
  });
});
