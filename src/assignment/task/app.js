require('./app.css');
const { store$ } = require('./store');
// const worker = require('../../worker/worker/store');
const {
  addTaskAsync,
  loadTasksAsync,
  doneTaskAsync,
  undoneTaskAsync,
  cancelTaskAsync,
} = require('./api/task.client');

// view
const btnTambah = document.getElementById('button-tambah');
const form = document.getElementById('task-form');
const card = document.getElementById('card');
const main = document.getElementById('main');
const inputName = document.getElementById('task-name');
const inputAttachment = document.getElementById('task-attachment');

btnTambah.addEventListener('click', () => {
  if (form.style.display === 'none') {
    form.style.display = 'block';
  } else {
    form.style.display = 'none';
  }
});

form.onsubmit = async (event) => {
  event.preventDefault();
  const task = {
    job: inputName.value,
    attachment: inputAttachment.value,
    done: 2,
  };
  // dispatch action add
  await store$.dispatch(addTaskAsync(task));
};

// presentation layer
store$.subscribe(() => {
  const state = store$.getState();
  render(state);
});

const state = store$.getState();
render(state);

store$.dispatch(loadTasksAsync);

function render(state) {
  main.innerHTML = '';
  for (let i = 0; i < state.length; i++) {
    const data = state[i];
    let nc = card.cloneNode(true);
    nc.style.display = 'inline-block';
    const job = nc.querySelector('#job');
    const attachment = nc.querySelector('#attach');
    const btnDone = nc.querySelector('#button-done');
    const btnCancel = nc.querySelector('#button-cancel');
    job.innerText = data.job;
    attachment.innerText = data.attachment;
    if (data.done == true) {
      job.className = 'task-done';
      btnDone.onclick = function () {
        // dispatch action done
        store$.dispatch(undoneTaskAsync(data.id));
      };
    } else {
      job.className = '';
      btnDone.onclick = function () {
        // dispatch action done
        store$.dispatch(doneTaskAsync(data.id));
      };
    }
    btnCancel.onclick = function () {
      // dispatch action done
      store$.dispatch(cancelTaskAsync(data.id));
    };
    if (data.done != 0) {
      main.append(nc);
    }
  }
}
