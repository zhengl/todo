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
		expect(ReactDOM.findDOMNode(item).textContent).toMatch(data.content);
	});

	it('calls TodoActions.delete the on clicking remove-todo button', () => {
		const removeTodoButton = TestUtils.findRenderedDOMComponentWithClass(todo, 'todo__remove');
		TestUtils.Simulate.click(ReactDOM.findDOMNode(removeTodoButton));
		expect(TodoActions.remove).toBeCalledWith(data);
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

		let newContent = 'new content';
		const inputComponent = TestUtils.findRenderedDOMComponentWithClass(todo, 'todo__edit__input');
		ReactDOM.findDOMNode(inputComponent).value = newContent;
		
		const formComponent = TestUtils.findRenderedDOMComponentWithClass(todo, 'todo__edit');
		TestUtils.Simulate.submit(ReactDOM.findDOMNode(formComponent));
		expect(TodoActions.change).toBeCalledWith({
			id: data.id,
			content: newContent
		});

		const todoEdits = TestUtils.scryRenderedDOMComponentsWithClass(todo, 'todo__edit');
		expect(todoEdits.length).toBe(0);
	});
});