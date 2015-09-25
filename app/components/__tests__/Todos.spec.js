jest.dontMock('../Todos');
jest.dontMock('../Todo');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Todos = require('../Todos');
const Todo = require('../Todo');

describe('Todos', () => {
	it('displays a list of Todo', () => {
		var data = [
			'Item 1',
			'Item 2',
			'Item 3'
		];
		const todos = TestUtils.renderIntoDocument(
			<Todos todos={data} />
		);

		const items = TestUtils.scryRenderedComponentsWithType(todos, Todo);
		expect(items.length).toBe(data.length);
	});
});