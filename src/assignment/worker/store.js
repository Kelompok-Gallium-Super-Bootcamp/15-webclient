const {
  createAction,
  createReducer,
  configureStore,
} = require('@reduxjs/toolkit');
const { initialState, add, loadWorkers } = require('./reducer');
const thunkMiddleware = require('redux-thunk');

const addAction = createAction('add');

const workerReducer = createReducer(initialState, {
  [addAction]: add,
  [loadAction]: loadWorkers,
});

const store$ = configureStore({
  reducer: workerReducer,
  middleware: [thunkMiddleware.default],
});

module.exports = {
  store$,
  addAction,
  loadAction,
};
