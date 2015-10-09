import React, { Component, PropTypes } from 'react';
import Todo from '../Todo';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './styles.css';

export default class Todos extends Component {
  render() {
    return (
      <ul className="todos">
        <ReactCSSTransitionGroup transitionName="todo" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
          { this.props.todos.map( todo =>
            <Todo
              key={todo.id}
              {...todo}
              onDelete={this.props.onTodoDelete}
              onUpdate={this.props.onTodoUpdate} />
              ) }
        </ReactCSSTransitionGroup>
      </ul>
    );
  }
}

Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  onTodoDelete: PropTypes.func.isRequired,
  onTodoUpdate: PropTypes.func.isRequired,
};
