import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import constants from '../constants';

const CHANGE_EVENT = 'TODO_STORE_CHANGE_EVENT';

let TODOS = [];

class TodoStore {
	static emitter = new EventEmitter()

	static addChangeListener(callback) {
		this.emitter.on(CHANGE_EVENT, callback);
	}

	static removeChangeListener(callback) {
		this.emitter.remove(CHANGE_EVENT, callback);
	}

	static emitChange() {
		this.emitter.emit(CHANGE_EVENT);
	}

	static getTodos() {
		return TODOS;
	}

	static setTodos(todos) {
		TODOS = todos;
		this.emitChange();
	}

	static addTodo(todo) {
		TODOS.unshift(todo);
		this.emitChange();
	}

	static updateTodo(updatedTodo) {
		TODOS.find(
			todo => todo.id == updatedTodo.id
		).content = updatedTodo.content;
	}
}

AppDispatcher.register((action) => {
	switch(action.source) {
		case constants.FETCH_ALL_SUCCESS:
			TodoStore.setTodos(action.todos);
			break;
		case constants.ADD_SUCCESS:
			TodoStore.addTodo(action.todo);
			break;
		case constants.REMOVE_SUCCESS:
			TodoStore.setTodos(action.todos);
			break;
		case constants.CHANGE_SUCCESS:
			TodoStore.updateTodo(action.todo);
			break;	
	}
});

export default TodoStore;