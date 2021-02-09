const { dispatch } = require('rxjs/internal/observable/pairs');
const {
  fetchWorkersApi,
  addWorkerApi,
  deleteWorkerApi,
} = require('./worker.service');
const { addAction, loadAction } = require('../store');

const addWorkerAsync = async (dispatch, getState) => {
  try {
    const addWorkersAsync = await addWorkerApi();
    dispatch(addAction(addWorkersAsync));
  } catch (err) {
    console.error(err);
  }
};

const loadWorkerAsync = async (dispatch, getState) => {
  try {
    const loadWorkerAsync = await fetchWorkersApi();
    dispatch(loadAction(loadWorkerAsync));
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  addWorkerAsync,
  loadWorkerAsync,
};
