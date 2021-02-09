const {
  createAction,
  createReducer,
  configureStore,
} = require('@reduxjs/toolkit');
const {
  initialState,
  add,
  done,
  undone,
  cancel,
  uncancel,
  loadTasks,
} = require('./reducer');
const { loggingMiddleware, delayActionMiddleware } = require('./middleware');
const thunkMiddleware = require('redux-thunk');

const addAction = createAction('add');
const doneAction = createAction('done');
const undoneAction = createAction('undone');
const cancelAction = createAction('cancel');
const uncancelAction = createAction('uncancel');
const loadTasksAction = createAction('loadTasks');

const taskReducer = createReducer(initialState, {
  [addAction]: add,
  [doneAction]: done,
  [undoneAction]: undone,
  [cancelAction]: cancel,
  [uncancelAction]: uncancel,
  [loadTasksAction]: loadTasks,
});

const store$ = configureStore({
  reducer: taskReducer,
  middleware: [
    thunkMiddleware.default,
    loggingMiddleware,
    delayActionMiddleware,
  ],
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
