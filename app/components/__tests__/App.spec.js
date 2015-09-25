jest.dontMock('../App');
jest.dontMock('../Todos');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const App = require('../App');
const Todos = require('../Todos');

describe('Todo', () => {
	it('has Todos', () => {
		const app = TestUtils.renderIntoDocument(
			<App />
		);
		const todos = TestUtils.findRenderedComponentWithType(app, Todos);
		expect(todos).toBeDefined();
	});

	it('has an input', () => {
		const app = TestUtils.renderIntoDocument(
			<App />
		);
		const input = TestUtils.findRenderedDOMComponentWithTag(app, 'input');
		expect(input).toBeDefined();
	});
});