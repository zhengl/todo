jest.dontMock('../');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Todo = require('../');
const TodoActions = require('../../../actions/TodoActions');

describe('Todo', () => {
	let data;
	let todo;

	beforeEach(() => {
		data = {
			id: '0001',
			content: 'testContent'
		};
		todo = TestUtils.renderIntoDocument(
			<Todo todo={data} />
		);
	});

	it('displays the content', () => {
		const item = TestUtils.findRenderedDOMComponentWithTag(todo, 'li');
		expect(ReactDOM.findDOMNode(item).textContent).toBe(data.content);
	});

	it('calls TodoActions.delete the on clicking remove-todo button', () => {
		const removeTodoButton = TestUtils.findRenderedDOMComponentWithTag(todo, 'button');
		TestUtils.Simulate.click(ReactDOM.findDOMNode(removeTodoButton));
		expect(TodoActions.remove).toBeCalledWith(data);
	});
});