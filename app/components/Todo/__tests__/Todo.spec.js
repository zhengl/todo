jest.dontMock('../');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Todo = require('../');

describe('Todo', () => {
  let data;
  let todo;
  let onUpdate;
  let onDelete;

  beforeEach(() => {
    data = {
      id: '0001',
      content: 'testContent',
    };
    onDelete = jest.genMockFn();
    onUpdate = jest.genMockFn();
    todo = TestUtils.renderIntoDocument(
      <Todo {...data} onDelete={onDelete} onUpdate={onUpdate} />
    );
  });

  it('displays the content', () => {
    const item = TestUtils.findRenderedDOMComponentWithTag(todo, 'li');
    expect(ReactDOM.findDOMNode(item).textContent).toMatch(data.content);
  });

  it('calls TodoActions.delete the on clicking remove-todo button', () => {
    const removeTodoButton = TestUtils.findRenderedDOMComponentWithClass(todo, 'todo__remove');
    TestUtils.Simulate.click(ReactDOM.findDOMNode(removeTodoButton));
    expect(onDelete).toBeCalledWith({ id: data.id });
  });

  it('shows edit input on double click', () => {
    const todoEdits = TestUtils.scryRenderedDOMComponentsWithClass(todo, 'todo__edit');
    expect(todoEdits.length).toBe(0);

    TestUtils.Simulate.doubleClick(ReactDOM.findDOMNode(todo));
    TestUtils.findRenderedDOMComponentWithClass(todo, 'todo__edit');
    const inputComponent = TestUtils.findRenderedDOMComponentWithClass(todo, 'todo__edit__input');
    expect(ReactDOM.findDOMNode(inputComponent).value).toMatch(data.content);
    TestUtils.findRenderedDOMComponentWithClass(todo, 'todo__edit__confirm');
  });

  it('changes content on submit and hides edit input', () => {
    TestUtils.Simulate.doubleClick(ReactDOM.findDOMNode(todo));

    const newContent = 'new content';
    const inputComponent = TestUtils.findRenderedDOMComponentWithClass(todo, 'todo__edit__input');
    const input = ReactDOM.findDOMNode(inputComponent);
    input.value = newContent;
    TestUtils.Simulate.change(input);

    const formComponent = TestUtils.findRenderedDOMComponentWithClass(todo, 'todo__edit');
    TestUtils.Simulate.submit(ReactDOM.findDOMNode(formComponent));
    expect(onUpdate).toBeCalledWith({
      id: data.id,
      content: newContent,
    });

    const todoEdits = TestUtils.scryRenderedDOMComponentsWithClass(todo, 'todo__edit');
    expect(todoEdits.length).toBe(0);
  });

  it('resumes content on clicking backdrop', () => {
    TestUtils.Simulate.doubleClick(ReactDOM.findDOMNode(todo));

    const newContent = 'new content';
    const inputComponent = TestUtils.findRenderedDOMComponentWithClass(todo, 'todo__edit__input');
    ReactDOM.findDOMNode(inputComponent).value = newContent;
    TestUtils.Simulate.change(ReactDOM.findDOMNode(inputComponent));

    const backdropComponent = TestUtils.findRenderedDOMComponentWithClass(todo, 'todo__backdrop');
    TestUtils.Simulate.click(ReactDOM.findDOMNode(backdropComponent));
    const item = TestUtils.findRenderedDOMComponentWithTag(todo, 'li');
    expect(ReactDOM.findDOMNode(item).textContent).toMatch(data.content);
  });
});
