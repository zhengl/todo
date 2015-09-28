import React from 'react';
import Todo from '../Todo';

import './styles.css';

export default class Todos extends React.Component {
	render() {
		return (
			<ul className="todos">
				{ this.props.todos.map( todo => <Todo key={todo.id} todo={todo} /> ) }
			</ul>
		);
	}
}