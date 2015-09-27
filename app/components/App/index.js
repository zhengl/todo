import React from 'react';
import Todos from '../Todos';
import TodoStore from '../../stores/TodoStore';
import TodoActions from '../../actions/TodoActions';

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
				<form onSubmit={this.handleAddTodo}>
					<input ref="newTodoContent" />
					<button type="submit" className="add-todo"></button>
				</form>
				<Todos todos={ this.state.todos } />
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
		TodoActions.add(this.refs.newTodoContent.value);
	}
}