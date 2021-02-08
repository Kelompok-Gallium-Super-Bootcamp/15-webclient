const { sub } = require('../lib/msgbus');
const { workerLog, taskTotalLog, taskDoneLog, taskCancelLog } = require('./performance');

function workerSubscriber() {
  const workerSub = sub('worker', workerSubHandling);
  return;
}

function taskSubscriber() {
  const taskSub = sub('task', taskSubHandling);
  return;
}

async function workerSubHandling(msg, reply, subject, sid) {
  await workerLog(msg);
}

async function taskSubHandling(msg, reply, subject, sid) {
	switch (msg) {
    case 'total':
      await taskTotalLog();
      break;
    case 'done':
      await taskDoneLog();
      break;
		case 'cancel':
      await taskCancelLog();
      break;
    default:
      return;
  }
}

module.exports = {
  workerSubscriber,
	taskSubscriber,
};
