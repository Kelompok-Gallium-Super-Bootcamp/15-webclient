const {
  createAction,
  createReducer,
  configureStore,
} = require('@reduxjs/toolkit');
const { } = require('./reducer');
const { } = require('./performance.middleware');
const thunkMiddleware = require('redux-thunk');



const store$ = configureStore({
  reducer: ,
  middleware: []
});

module.exports = {
  
};
