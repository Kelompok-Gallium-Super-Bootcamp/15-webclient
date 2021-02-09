const { dispatch } = require('rxjs/internal/observable/pairs');
const { 
	fetchWorkersApi,
	taskCancelledApi,
	taskDoneApi,
	taskTotalApi,	
} = require('./performance.service');
const {
  loadWorkersAction,
	taskTotalAction,
	taskDoneAction,
	taskCancelledAction
} = require('../store');

const loadWorkersAsync = async (dispatch, getState) => {
  try{
		const workersAsync = await fetchWorkersApi();
		dispatch(loadWorkersAction(workersAsync));
	} catch(err){
		console.error(err);
	}	
};

const taskTotalAsync = async (dispatch, getState) => {
  try{
		const tasksAsync = await taskTotalApi();
		dispatch(taskTotalAction(tasksAsync));
	} catch(err){
		console.error(err);
	}	
};

const taskDoneAsync = async (dispatch, getState) => {
  try{
		const tasksAsync = await taskDoneApi();
		dispatch(taskDoneAction(tasksAsync));
	} catch(err){
		console.error(err);
	}	
};

const taskCancelledAsync = async (dispatch, getState) => {
  try{
		const tasksAsync = await taskCancelledApi();
		dispatch(taskCancelledAction(tasksAsync));
	} catch(err){
		console.error(err);
	}	
};

module.exports = {
  loadWorkersAsync,
	taskTotalAsync,
	taskCancelledAsync,
	taskDoneAsync,
};
