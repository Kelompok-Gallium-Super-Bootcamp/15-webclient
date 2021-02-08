require('./app.css');
const { store$ } = require('./store');
const {
  loadWorkersAsync,
} = require('./api/performance.client');

// view
const workerTotal = document.getElementById('worker-total');

// presentation layer
store$.subscribe(() => {
  const state = store$.getState();
  render(state);
});
const state = store$.getState();
render(state);

store$.dispatch(loadWorkersAsync);

function render(state) {
  workerTotal.innerHTML = state.totalWorker;
}
