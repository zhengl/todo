import axios from 'axios';
import TodoServerActions from '../actions/TodoServerActions';

export default {
  fetchAll: () => {
    axios
      .get('/todos')
      .then((res) => TodoServerActions.handleFetchAllSuccess(res.data));
  },

  add: (todo) => {
    axios
      .post('/todos', { todo: todo })
      .then((res) => TodoServerActions.handleAddSuccess(res.data));
  },

  remove: (todo) => {
    axios
      .delete(`/todos/${todo.id}`)
      .then((res) => TodoServerActions.handleRemoveSuccess(res.data));
  },

  change: (todo) => {
    axios
      .put(`/todos/${todo.id}`, { content: todo.content })
      .then((res) => TodoServerActions.handleChangeSuccess(res.data));
  },
};
