jest.dontMock('../');
jest.dontMock('../../Todos');
jest.dontMock('../../Todo');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const App = require('../');
const Todos = require('../../Todos');
const Todo = require('../../Todo');

const TodoActions = require('../../../actions/TodoActions');
const TodoStore = require('../../../stores/TodoStore');

describe('App', () => {
	let app;
	let node;
	let form;
	let input;
	let addTodoButton;

	beforeEach(() => {
		TodoActions.add.mockClear();
		TodoStore.addChangeListener.mockClear();

		node = document.createElement('div');
		app = ReactDOM.render(<App />, node);

		let inputComponent = TestUtils.findRenderedDOMComponentWithClass(app, 'main__new-todo-container__input');
		input = ReactDOM.findDOMNode(inputComponent);

		let formComponent = TestUtils.findRenderedDOMComponentWithTag(app, 'form');
		form = ReactDOM.findDOMNode(formComponent);
	});

	afterEach(() => {
		ReactDOM.unmountComponentAtNode(node);
	});

	it('fetches all todos on mount', () => {
		expect(TodoActions.fetchAll).toBeCalled();
	});

	it('listens to TodoStore', () => {
		expect(TodoStore.addChangeListener).toBeCalled();
	});

	it('list todos on change', () => {
		const onChange = TodoStore.addChangeListener.mock.calls[0][0];
		
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

		TodoStore.getTodos.mockReturnValue(data);
		onChange();
		const items = TestUtils.scryRenderedComponentsWithType(app, Todo);
		expect(items.length).toBe(3);
	});
	
	it('has Todos', () => {
		const todos = TestUtils.findRenderedComponentWithType(app, Todos);
		expect(todos).toBeDefined();
	});

	function submitFormWithContent(content) {
		input.value = content;
		TestUtils.Simulate.submit(form);
	}

	it('adds todo on submitting the form', () => {
		let testContent = 'new content';
		submitFormWithContent(testContent)
		expect(TodoActions.add).toBeCalledWith(testContent);
		expect(input.value).toBe('');
	});

	it('should not add todo when input is empty', () => {
		submitFormWithContent('');
		expect(TodoActions.add).not.toBeCalled();
	});
});