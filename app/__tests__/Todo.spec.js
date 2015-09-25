jest.dontMock('../Todo');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Todo = require('../Todo');

describe('Todo', () => {
	it('displays the content', () => {
		var data = 'testContent';
		const todo = TestUtils.renderIntoDocument(
			<Todo todo={data} />
		);
		const item = TestUtils.findRenderedDOMComponentWithTag(todo, 'li');
		expect(ReactDOM.findDOMNode(item).textContent).toBe(data);
	});
});