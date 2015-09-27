import React from 'react';
import Todo from '../Todo';

export default class Todos extends React.Component {
	render() {
		return (
			<ul>
				{ this.props.todos.map( todo => <Todo key={todo.id} todo={todo} /> ) }
			</ul>
		);
	}
}