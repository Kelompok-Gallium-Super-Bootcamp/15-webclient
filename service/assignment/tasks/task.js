const { read, write, del, update } = require('../lib/relationship');

const ERROR_REGISTER_DATA_INVALID = 'data registrasi pekerja tidak lengkap';
const ERROR_DATA_NOT_FOUND = 'data task tidak ditemukan';
const ERROR_ASSIGNEE_ID_NOT_FOUND = 'worker yang diassign tidak ditemukan';
const ERROR_ALREADY_DONE = 'task sudah selesai';
const ERROR_ALREADY_CANCEL = 'task sudah batal';

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
	let workers = await read('worker');
  if (!workers) {
    throw ERROR_ASSIGNEE_ID_NOT_FOUND;
  }
  const idx = workers.findIndex((w) => w.id === parseInt(data.assigneeId));
  if (idx === -1) {
    throw ERROR_ASSIGNEE_ID_NOT_FOUND;
  }
	const task = {
    job: data.job,
    assigneeId: data.assigneeId,
    attachment: data.attachment,
    done: data.done,
    cancel: data.cancel,
  };
  await write('task', task);
  return task;
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
  const idx = tasks.findIndex((w) => w.id === parseInt(id));
  if (idx === -1) {
    throw ERROR_DATA_NOT_FOUND;
  }
	if(tasks[idx].done){
		throw ERROR_ALREADY_DONE;
	}
	if(tasks[idx].cancel){
		throw ERROR_ALREADY_CANCEL;
	}
  tasks[idx].done = true;
	const data = {
    job: tasks[idx].job,
    assigneeId: tasks[idx].assigneeId,
    attachment: tasks[idx].attachment,
    done: tasks[idx].done,
    cancel: tasks[idx].cancel,
  };
	await update('task', id, data);
  return data;
}

async function cancelDataTask(id) {
  let tasks = await read('task');
  if (!tasks) {
    throw ERROR_DATA_NOT_FOUND;
  }
  const idx = tasks.findIndex((w) => w.id === parseInt(id));
  if (idx === -1) {
    throw ERROR_DATA_NOT_FOUND;
  }
	if(tasks[idx].done){
		throw ERROR_ALREADY_DONE;
	}
	if(tasks[idx].cancel){
		throw ERROR_ALREADY_CANCEL;
	}
  tasks[idx].cancel = true;
	const data = {
    job: tasks[idx].job,
    assigneeId: tasks[idx].assigneeId,
    attachment: tasks[idx].attachment,
    done: tasks[idx].done,
    cancel: tasks[idx].cancel,
  };
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
	ERROR_ASSIGNEE_ID_NOT_FOUND,
	ERROR_ALREADY_DONE,
	ERROR_ALREADY_CANCEL,
};
