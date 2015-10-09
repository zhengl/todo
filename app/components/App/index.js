import React from 'react';
import Todos from '../Todos';
import TodoStore from '../../stores/TodoStore';
import TodoActions from '../../actions/TodoActions';

import './styles.css';
import addIcon from 'material-design-icons/content/svg/production/ic_add_24px.svg';
import confirmIcon from 'material-design-icons/action/svg/production/ic_done_24px.svg';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      isAddingTodo: false,
    };
  }

  componentDidMount() {
    TodoActions.fetchAll();
    TodoStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this.onChange);
  }

  onChange = () => {
    this.setState({
      todos: TodoStore.getTodos(),
      isAddingTodo: false,
    });
  }

  handleAddTodo = (event) => {
    event.preventDefault();
    const input = this.refs.newTodoContent;
    if (input.value !== '') {
      TodoActions.add(input.value);
      input.value = '';
    }
  }

  toggleMode = () => {
    this.setState({
      isAddingTodo: !this.state.isAddingTodo,
    });
  }

  render() {
    let containerClass = 'main__new-todo-container';
    if (this.state.isAddingTodo) {
      containerClass += ' ' + containerClass + '_open';
    }

    let addTodoButtonClass = 'main__add-todo';
    if (this.state.isAddingTodo) {
      addTodoButtonClass += ' ' + addTodoButtonClass + '_rotated';
    }

    return (
      <div>
        <header className="toolbar">
          <span className="toolbar__title">Todo List</span>
        </header>
        <main className="main">
          <span className="main__title">Todo List</span>
          <form className={containerClass} onSubmit={this.handleAddTodo}>
            <input className="main__new-todo-container__input" ref="newTodoContent" placeholder="New Todo" />
            <button className="main__new-todo-container__confirm" type="submit" dangerouslySetInnerHTML={{__html: confirmIcon}}></button>
          </form>
          <Todos todos={ this.state.todos } onTodoDelete={ TodoActions.remove } onTodoUpdate={ TodoActions.change } />
          <button className={addTodoButtonClass} onClick={this.toggleMode} dangerouslySetInnerHTML={{__html: addIcon}}></button>
        </main>
      </div>
    );
  }
}
