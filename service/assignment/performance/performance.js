const { save, read } = require('../lib/kv');

async function workerLog(msg) {
  const data = await read('workerTotal');
  let count;
  if (!data) {
    count = 0;
  } else {
    count = parseInt(data);
  }
  switch (msg) {
    case 'add':
      count++;
      break;
    case 'remove':
      count--;
      break;
    default:
      return;
  }
  await save('workerTotal', count);
  return;
}

async function taskTotalLog(msg) {
  let count = await read('taskTotal');
  if (!count) {
    count = 1;
  } else {
    count = parseInt(count) + 1;
  }
  await save('taskTotal', count);
  return;
}

async function taskDoneLog(msg) {
  let count = await read('taskDone');
  if (!count) {
    count = 1;
  } else {
    count = parseInt(count) + 1;
  }
  await save('taskDone', count);
  return;
}

async function taskCancelLog(msg) {
  let count = await read('taskCancelled');
  if (!count) {
    count = 1;
  } else {
    count = parseInt(count) + 1;
  }
  await save('taskCancelled', count);
  return;
}

async function listWorkerTotal() {
  let total = await read('workerTotal');
  if (!total) {
    total = 0;
  }
  return total;
}

async function listTaskTotal() {
  let total = await read('taskTotal');
  if (!total) {
    total = 0;
  }
  return total;
}

async function listTaskDone() {
  let total = await read('taskDone');
  if (!total) {
    total = 0;
  }
  return total;
}

async function listTaskCancelled() {
  let total = await read('taskCancelled');
  if (!total) {
    total = 0;
  }
  return total;
}

module.exports = {
  workerLog,
  taskTotalLog,
  taskDoneLog,
  taskCancelLog,
  listWorkerTotal,
  listTaskTotal,
  listTaskDone,
  listTaskCancelled,
};
