import React from 'react';
import Todo from '../Todo';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './styles.css';

export default class Todos extends React.Component {
	render() {
		return (
			<ul className="todos">
				<ReactCSSTransitionGroup transitionName="todo" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
					{ this.props.todos.map( todo => <Todo key={todo.id} todo={todo} /> ) }
				</ReactCSSTransitionGroup>
			</ul>
		);
	}
}