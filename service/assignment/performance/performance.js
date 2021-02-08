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
  listWorkerTotal,
  listTaskTotal,
  listTaskDone,
  listTaskCancelled,
};
