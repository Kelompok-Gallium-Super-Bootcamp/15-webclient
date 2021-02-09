const {
  createAction,
  createReducer,
  configureStore,
} = require('@reduxjs/toolkit');
const { initialState, add } = require('./reducer');
const {
  loggingMiddleware,
  delayActionMiddleware,
} = require('./worker.middleware');
const thunkMiddleware = require('redux-thunk');

const addAction = createAction('add');

const workerReducer = createReducer(initialState, {
  [addAction]: add,
});

const store$ = configureStore({
  reducer: workerReducer,
  middleware: [
    thunkMiddleware.default,
    loggingMiddleware,
    delayActionMiddleware,
  ],
});

module.exports = {
  store$,
  addAction,
};
