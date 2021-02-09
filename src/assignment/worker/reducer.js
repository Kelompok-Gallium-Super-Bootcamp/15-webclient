// setup state
const initialState = {
  data: [],
};

// reduce function
function add(state, action) {
  const { id, nama, alamat, email, telepon, biografi, foto } = action.payload;
  state.data.push({
    id,
    nama,
    alamat,
    email,
    telepon,
    biografi,
    foto,
  });
  return state.data;
}

// function done(state, action) {
//   const task = state.data.find((t) => t.id === action.payload);
//   task.done = true;
//   return state;
// }

// function undone(state, action) {
//   const task = state.data.find((t) => t.id === action.payload);
//   task.done = false;
//   return state;
// }

// function loadTasks(state, action) {
//   state = action.payload;
//   return state;
// }

module.exports = {
  initialState,
  add,
  done,
  undone,
  loadTasks,
};
