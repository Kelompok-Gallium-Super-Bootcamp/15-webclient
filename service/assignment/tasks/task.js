const { read, write, del, update } = require('../lib/relationship');

const ERROR_REGISTER_DATA_INVALID = 'data registrasi pekerja tidak lengkap';
const ERROR_DATA_NOT_FOUND = 'data task tidak ditemukan';

async function writeDataTask(data){
  if (
    !data.job ||
    !data.assigneeId ||
    !data.attachment ||
    !data.done ||
    !data.cancel
  ) {
    throw ERROR_REGISTER_DATA_INVALID;
  }
  const task = {
    job: data.job,
    assigneeId: data.assigneeId,
    attachment: data.attachment,
    done: data.done,
    cancel: data.cancel,
  };
  await write('task', task);
  return worker;
}

async function readTask() {
  let tasks = await read('task');
  if (!tasks) {
    tasks = [];
  }
  return tasks;
}

async function doneDataTask(id) {
  let tasks = await read('task');
  if (!tasks) {
    throw ERROR_DATA_NOT_FOUND;
  }
  const idx = tasks.findIndex((w) => w.id === id);
  if (idx === -1) {
    throw ERROR_DATA_NOT_FOUND;
  }
  tasks[idx].done = true;
	const data = tasks[idx];
  await update('task', id, data);
  return data;
}

async function cancelDataTask(id) {
  let tasks = await read('task');
  if (!tasks) {
    throw ERROR_DATA_NOT_FOUND;
  }
  const idx = tasks.findIndex((w) => w.id === id);
  if (idx === -1) {
    throw ERROR_DATA_NOT_FOUND;
  }
  tasks[idx].cancel = true;
	const data = tasks[idx];
  await update('task', id, data);
  return data;
}

module.exports = {
  writeDataTask,
  doneDataTask,
  cancelDataTask,
  readTask,
  ERROR_REGISTER_DATA_INVALID,
  ERROR_DATA_NOT_FOUND,
};
