import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import constants from '../constants';

const CHANGE_EVENT = 'TODO_STORE_CHANGE_EVENT';

let TODOS = [];

const TodoStore = Object.assign({}, EventEmitter.prototype, {
	addChangeListener: (callback) => {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: (callback) => {
		this.remove(CHANGE_EVENT, callback);
	},

	emitChange: () => this.emit(CHANGE_EVENT),

	getTodos: () => TODOS,

	setTodos: (todos) => { TODOS = todos }
})

AppDispatcher.register((action) => {
	switch(action.source) {
		case constants.FETCH_ALL_SUCCESS:
			TodoStore.setTodos(action.todos);
			TodoStore.emitChange();
			break;		
	}
});

export default TodoStore;