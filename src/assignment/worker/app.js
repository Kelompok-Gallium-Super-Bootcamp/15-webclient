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
  console.log('data : ', state.length);
  for (let i = 0; i < state.length; i++) {
    const row = tableData.insertRow(i + 1);
    const id = row.insertCell(0);
    const name = row.insertCell(1);
    const address = row.insertCell(2);
    const email = row.insertCell(3);
    const telephone = row.insertCell(4);
    const biography = row.insertCell(5);
    const photo = row.insertCell(6);
    id.innerHTML = state[i].id;
    name.innerHTML = state[i].name;
    address.innerHTML = state[i].address;
    email.innerHTML = state[i].email;
    telephone.innerHTML = state[i].telephone;
    biography.innerHTML = state[i].biography;
    photo.innerHTML = state[i].photo;
  }
}
