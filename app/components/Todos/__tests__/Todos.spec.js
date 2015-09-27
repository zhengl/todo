jest.dontMock('../');
jest.dontMock('../../Todo');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Todos = require('../');
const Todo = require('../../Todo');

describe('Todos', () => {
	it('displays a list of Todo', () => {
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
		const todos = TestUtils.renderIntoDocument(
			<Todos todos={data} />
		);

		const items = TestUtils.scryRenderedComponentsWithType(todos, Todo);
		expect(items.length).toBe(data.length);
	});
});