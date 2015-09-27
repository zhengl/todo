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
		TODOS.push(todo);
		this.emitChange();
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
	}
});

export default TodoStore;