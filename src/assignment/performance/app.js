require('./app.css');
const { store$ } = require('./store');
const {
  loadWorkersAsync,
	taskTotalAsync,
	taskCancelledAsync,
	taskDoneAsync,
} = require('./api/performance.client');

// view
const workerTotal = document.getElementById('worker-total');
const taskDoneEl = document.getElementById('task-done');
const taskUndoneEl = document.getElementById('task-undone');
const taskCancelledEl = document.getElementById('task-cancelled');

// presentation layer
store$.subscribe(() => {
  const state = store$.getState();
  render(state);
});
const state = store$.getState();
render(state);

store$.dispatch(loadWorkersAsync);
store$.dispatch(taskTotalAsync);
store$.dispatch(taskCancelledAsync);
store$.dispatch(taskDoneAsync);

function render(state) {
  workerTotal.innerHTML = state.totalWorker;
	taskDoneEl.innerHTML = state.taskDone;
	taskCancelledEl.innerHTML = state.taskCancelled;
	const undoneCount = state.totalTask - state.taskCancelled - state.taskDone;
	taskUndoneEl.innerHTML = undoneCount;
}
