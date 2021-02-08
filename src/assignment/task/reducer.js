// setup state
const initialState = [];

function add(state, action) {
  state.push({
    id: action.payload.id,
    job: action.payload.job,
    // assigneeId: { name: action.payload.name },
    attachment: action.payload.attachhment,
    done: action.payload.done,
    cancel: action.payload.cancel,
  });
  return state;
}

function done(state, action) {
  const task = state.find((e) => e.id === action.payload);
  task.done = true;
  return state;
}

function undone(state, action) {
  const task = state.find((e) => e.id === action.payload);
  task.done = false;
  return state;
}

function cancel(state, action) {
  const task = state.find((e) => e.id === action.payload);
  task.cancel = true;
  return state;
}

function uncancel(state, action) {
  const task = state.find((e) => e.id === action.payload);
  task.cancel = false;
  return state;
}

function loadTasks(state, action) {
  state = action.payload;
  return state;
}

// reduce function

module.exports = {
  initialState,
  add,
  done,
  undone,
  cancel,
  uncancel,
  loadTasks,
};
