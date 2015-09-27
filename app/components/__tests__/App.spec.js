jest.dontMock('../App');
jest.dontMock('../Todos');
jest.dontMock('../Todo');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const App = require('../App');
const Todos = require('../Todos');
const Todo = require('../Todo');

const TodoActions = require('../../actions/TodoActions');
const TodoStore = require('../../stores/TodoStore');

describe('App', () => {
	let app;
	let node;

	beforeEach(() => {
		node = document.createElement('div');
		app = ReactDOM.render(<App />, node);
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
		const calls = TodoStore.addChangeListener.mock.calls;
		let onChange = calls[calls.length - 1][0];
		
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

	it('has an input', () => {
		const input = TestUtils.findRenderedDOMComponentWithTag(app, 'input');
		expect(input).toBeDefined();
	});

	it('adds todo', () => {
		let testContent = 'new todo';
		const input = TestUtils.findRenderedDOMComponentWithTag(app, 'input');
		ReactDOM.findDOMNode(input).value = testContent;
		const form = TestUtils.findRenderedDOMComponentWithTag(app, 'form');
		TestUtils.Simulate.submit(ReactDOM.findDOMNode(form));
		
		expect(TodoActions.add).toBeCalledWith(testContent);
	});
});