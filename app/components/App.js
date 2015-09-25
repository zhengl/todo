import React from 'react';
import Todos from './Todos';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { todos: [] };
	}

	render() {
		return (
			<div>
				<Todos todos={ this.state.todos }/>
			</div>
		);
	}
}