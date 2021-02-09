// require('./app.css');
const { store$ } = require('./store');
const { addWorkerAsync, loadWorkerAsync } = require('./api/worker.client');

// view
const tableData = document.getElementsByClassName('table-data')[0];
const nama = document.getElementById('nama');
const alamat = document.getElementById('alamat');
const email = document.getElementById('email');
const telepon = document.getElementById('telepon');
const bio = document.getElementById('bio');
const foto = document.getElementById('foto');
const simpan = document.getElementById('simpan');

const workers = {
  nama: '',
  alamat: '',
  email: '',
  telepon: '',
  bio: '',
  foto: '',
};
// presentation layer

simpan.addEventListener('click', () => {
  workers.nama = nama.value;
  workers.alamat = alamat.value;
  workers.email = email.value;
  workers.telepon = telepon.value;
  workers.bio = bio.value;
  workers.foto = foto.value;
  store$.dispatch(addWorkerAsync(workers));
});

store$.subscribe(() => {
  const state = store$.getState();
  render(state);
});
const state = store$.getState();
render(state);

store$.dispatch(loadWorkerAsync);

function render(state) {
  const row = tableData.insertRow(state.data.length);
  for (let i = 0; i < state.data.length; i++) {
    const kolom = row.insertCell(i);
    kolom.innerHTML = state.data[i];
  }
}
