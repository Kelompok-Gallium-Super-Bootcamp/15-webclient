// require('./app.css');
const { store$ } = require('./store');
const {} = require('./api/worker.client');

// view

// presentation layer
const tableData = document.getElementsByClassName('table-data')[0];
const nama = document.getElementById('nama');
const alamat = document.getElementById('alamat');
const email = document.getElementById('email');
const telepon = document.getElementById('telepon');
const bio = document.getElementById('bio');
const foto = document.getElementById('foto');
const simpan = document.getElementById('simpan');

store$.subscribe(() => {
  const state = store$.getState();
  render(state);
});
const state = store$.getState();
render(state);

function render(state) {
  const row = tableData.insertRow(state.data.length);
  for (let i = 0; i < state.data.length; i++) {
    const kolom = row.insertCell(i);
    kolom.innerHTML = state.data[i];
  }
}
