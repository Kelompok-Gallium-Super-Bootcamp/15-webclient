const {
  createAction,
  createReducer,
  configureStore,
} = require('@reduxjs/toolkit');
const { } = require('./reducer');
const { } = require('./task.middleware');
const thunkMiddleware = require('redux-thunk');
const { add } = require('../../lib/todo/reducer');

const addAction = createAction('add');
const doneAction = createAction('done');
const undoneAction = createAction('undone');
const cancelAction = createAction('cancel');
const uncancelAction = createAction('uncancel');
const loadTasksAction = createAction('loadTasks');

const todoReducer = createReducer(initialState, {
  [addAction] : add,
  [doneAction] : done,
  [undoneAction] : undone,
  [cancelAction] : cancel,
  [uncancelAction] : uncancel,
  [loadTasksAction] : loadTasks,
})

const store$ = configureStore({
  reducer: taskReducer,
  middleware: []
});

module.exports = {
  store$,
  addAction,
  doneAction,
  undoneAction,
  cancelAction,
  uncancelAction,
  loadTasksAction,
};
