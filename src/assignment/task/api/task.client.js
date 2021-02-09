const { dispatch } = require('rxjs/internal/observable/pairs');
const {
  fetchTaskApi,
  addTaskApi,
  doneTaskApi,
  undoneTaskApi,
  cancelTaskApi,
  uncancelTaskApi,
} = require('../api/task.service');
const {
  addAction,
  doneAction,
  undoneAction,
  cancelAction,
  uncancelAction,
  loadTasksAction,
} = require('../store');

const addTaskAsync = (task) => async (dispatch, getState) => {
  const taskData = await addTaskApi(task);
  dispatch(addAction(taskData));
};

const loadTasksAsync = async (dispatch, getState) => {
  const tasksAsync = await fetchTaskApi();
  dispatch(loadTasksAction(tasksAsync));
};

const doneTaskAsync = (id) => {
  return async (dispatch, getState) => {
    await doneTaskApi(id);
    dispatch(doneAction(id));
  };
};

const undoneTaskAsync = (id) => {
  return async (dispatch, getState) => {
    try {
      await undoneTaskApi(id);
      await dispatch(undoneAction(id));
    } catch (err) {
      console.log(err);
    }
  };
};
const cancelTaskAsync = (id) => {
  return async (dispatch, getState) => {
    try {
      await cancelTaskApi(id);
      dispatch(cancelAction(id));
    } catch (err) {
      console.log(err);
    }
  };
};
const uncancelTaskAsync = (id) => {
  return async (dispatch, getState) => {
    try {
      await uncancelTaskApi(id);
      dispatch(uncancelAction(id));
    } catch (err) {
      console.log(err);
    }
  };
};

module.exports = {
  addTaskAsync,
  loadTasksAsync,
  doneTaskAsync,
  undoneTaskAsync,
  cancelTaskAsync,
  uncancelTaskAsync,
};
