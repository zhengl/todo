import React from 'react';
import TodoActions from '../../actions/TodoActions';

import './styles.css';
import removeIcon from 'material-design-icons/content/svg/production/ic_clear_24px.svg';

export default class Todo extends React.Component {
	render() {
		let { id, content } = this.props.todo;
		return (
			<li className="todo">
				<span className="todo__content">{ content }</span>
				<button className="todo__remove" onClick={ this.handleRemove }  dangerouslySetInnerHTML={{__html: removeIcon}}></button>
			</li>
		);
	}

	handleRemove = () => {
		TodoActions.remove(this.props.todo);
	}
}