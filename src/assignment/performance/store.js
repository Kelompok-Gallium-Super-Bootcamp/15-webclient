const {
  createAction,
  createReducer,
  configureStore,
} = require('@reduxjs/toolkit');
const { initialState, workerTotalChange} = require('./reducer');
const thunkMiddleware = require('redux-thunk');

const loadWorkersAction = createAction('worker');


const performanceReducer = createReducer(initialState, {
  [loadWorkersAction]: workerTotalChange
});


const store$ = configureStore({
  reducer: performanceReducer,
  middleware: [thunkMiddleware.default]
});

module.exports = {
  store$,
	loadWorkersAction,
};
