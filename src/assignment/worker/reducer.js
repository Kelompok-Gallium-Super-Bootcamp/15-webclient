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

function loadWorkers(state, action) {
  state = action.payload;
  return state;
}

module.exports = {
  initialState,
  add,
  loadWorkers,
};
