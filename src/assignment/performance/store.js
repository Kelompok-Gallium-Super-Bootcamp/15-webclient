const {
  createAction,
  createReducer,
  configureStore,
} = require('@reduxjs/toolkit');
const {
  initialState,
  workerTotalChange,
  taskCancelledChange,
  taskDoneChange,
  taskTotalChange,
} = require('./reducer');
const thunkMiddleware = require('redux-thunk');

const loadWorkersAction = createAction('worker');
const taskTotalAction = createAction('taskTotal');
const taskDoneAction = createAction('taskDone');
const taskCancelledAction = createAction('taskCancelled');

const performanceReducer = createReducer(initialState, {
  [loadWorkersAction]: workerTotalChange,
  [taskTotalAction]: taskTotalChange,
  [taskDoneAction]: taskDoneChange,
  [taskCancelledAction]: taskCancelledChange,
});

const store$ = configureStore({
  reducer: performanceReducer,
  middleware: [thunkMiddleware.default],
});

module.exports = {
  store$,
  loadWorkersAction,
  taskTotalAction,
  taskDoneAction,
  taskCancelledAction,
};
