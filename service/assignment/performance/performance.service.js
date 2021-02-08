const { listWorkerTotal, listTaskTotal, listTaskDone, listTaskCancelled } = require('./performance');

async function workerTotalSvc(req, res) {
  try {
    const total = await listWorkerTotal();
    res.write(total.toString());
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.end();
    return;
  }
}

async function taskTotalSvc(req, res) {
  try {
    const total = await listTaskTotal();
    res.write(total.toString());
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.end();
    return;
  }
}

async function taskDoneSvc(req, res) {
  try {
    const total = await listTaskDone();
    res.write(total.toString());
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.end();
    return;
  }
}

async function taskCancelledSvc(req, res) {
  try {
    const total = await listTaskCancelled();
    res.write(total.toString());
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.end();
    return;
  }
}

module.exports = {
  workerTotalSvc,
	taskCancelledSvc, 
	taskDoneSvc, 
	taskTotalSvc,
};
