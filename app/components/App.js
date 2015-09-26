import React from 'react';
import Todos from './Todos';
import TodoStore from '../stores/TodoStore';
import TodoActions from '../actions/TodoActions';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { todos: [] };
		this.onChange = () => {
			this.setState({
				todos: TodoStore.getTodos()
			});
		}
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
				<input />
				<Todos todos={ this.state.todos }/>
			</div>
		);
	}
}