import TodoDao from '../dao/TodoDao';

export default {
  fetchAll: () => TodoDao.fetchAll(),
  add: (todo) => TodoDao.add(todo),
  remove: (todo) => TodoDao.remove(todo),
  change: (todo) => TodoDao.change(todo),
};
