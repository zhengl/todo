import React from 'react';
import Todos from '../Todos';
import TodoStore from '../../stores/TodoStore';
import TodoActions from '../../actions/TodoActions';

import './styles.css';
import addIcon from 'material-design-icons/content/svg/production/ic_add_24px.svg';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { todos: [] };
	}

	componentDidMount() {
		TodoActions.fetchAll();
		TodoStore.addChangeListener(this.onChange);
	}

	componentWillUnmount() {
		TodoStore.removeChangeListener(this.onChange);
	}

	render() {
		return (
			<div>
				<header className="toolbar">
					<form onSubmit={this.handleAddTodo}>
						<input className="toolbar__new-todo" ref="newTodoContent" />
					</form>
				</header>
				<main className="main">
					<Todos todos={ this.state.todos } />
					<button className="main__add-todo" onClick={this.handleAddTodo} dangerouslySetInnerHTML={{__html: addIcon}}></button>
				</main>
			</div>
		);
	}

	onChange = () => {
		this.setState({
			todos: TodoStore.getTodos()
		});
	}

	handleAddTodo = (e) => {
		e.preventDefault();
		const input = this.refs.newTodoContent;
		if(input.value !== '') {
			TodoActions.add(input.value);
			input.value = '';
		}
	}
}