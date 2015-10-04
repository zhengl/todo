import React from 'react';
import TodoActions from '../../actions/TodoActions';

import './styles.css';
import removeIcon from 'material-design-icons/content/svg/production/ic_clear_24px.svg';
import confirmIcon from 'material-design-icons/action/svg/production/ic_done_24px.svg';

export default class Todo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: props.todo.content,
			isEditing: false
		};
	}

	render() {
		let { id } = this.props.todo;
		let { content } = this.state;
		if(this.state.isEditing) {
			return (
				<li className="todo">
					<form className="todo__edit" onSubmit={ this.handleChange }>
						<input className="todo__edit__input" value={ content } onChange={ this.onChangeContent } />
						<button className="todo__edit__confirm" type="submit" dangerouslySetInnerHTML={{__html: confirmIcon}}></button>
					</form>
				</li>
			);
		} else {
			return (
				<li className="todo" onDoubleClick={ this.changeToEditMode }>
					<span className="todo__content">{ content }</span>
					<button className="todo__remove" onClick={ this.handleRemove }  dangerouslySetInnerHTML={{__html: removeIcon}}></button>
				</li>
			);
		}
	}

	handleRemove = () => {
		TodoActions.remove(this.props.todo);
	}

	handleChange = (e) => {
		e.preventDefault();
		TodoActions.change({
			id: this.props.todo.id,
			content: this.state.content
		});
		this.setState({
			isEditing: false
		});
	}

	onChangeContent = (e) => {
		this.setState({
			content: e.target.value
		});
	}

	changeToEditMode = () => {
		this.setState({
			isEditing: true
		});
	}
}