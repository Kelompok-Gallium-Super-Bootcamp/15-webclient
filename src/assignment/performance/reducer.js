// setup state
const initialState = {
	totalWorker : 0,
	totalTaskDone: 0,
	totalTaskCancelled: 0,
	totalTaskUndone: 0,
};

// reduce function
function workerTotalChange(state, action) {
  state.totalWorker = action.payload;
  return state;
}

module.exports = {
  initialState,
  workerTotalChange,
};
