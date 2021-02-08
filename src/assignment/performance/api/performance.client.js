const { dispatch } = require('rxjs/internal/observable/pairs');
const { fetchWorkersApi } = require('./performance.service');
const {
  loadWorkersAction,
} = require('../store');

const loadWorkersAsync = async (dispatch, getState) => {
  try{
		const workersAsync = await fetchWorkersApi();
		dispatch(loadWorkersAction(workersAsync));
	} catch(err){
		console.error(err);
	}	
};

module.exports = {
  loadWorkersAsync,
};
