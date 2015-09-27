import React from 'react';
import TodoActions from '../actions/TodoActions';

export default class Todo extends React.Component {
	render() {
		let { id, content } = this.props.todo;
		return (
			<li>
				{ content }
				<button onClick={this.handleRemove} />
			</li>
		);
	}

	handleRemove = () => {
		TodoActions.remove(this.props.todo);
	}
}