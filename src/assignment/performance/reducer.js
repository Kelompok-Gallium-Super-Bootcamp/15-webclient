// setup state
const initialState = {
	totalWorker : 0,
	taskDone: 0,
	taskCancelled: 0,
	totalTask: 0,
};

// reduce function
function workerTotalChange(state, action) {
  state.totalWorker = action.payload;
  return state;
}

function taskCancelledChange(state, action) {
  state.taskCancelled = action.payload;
  return state;
}

function taskDoneChange(state, action) {
  state.taskDone = action.payload;
  return state;
}

function taskTotalChange(state, action) {
  state.totalTask = action.payload;
  return state;
}

module.exports = {
  initialState,
  workerTotalChange,
	taskCancelledChange, 
	taskDoneChange, 
	taskTotalChange,
};
