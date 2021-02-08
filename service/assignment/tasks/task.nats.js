const { pub } = require('../lib/msgbus');

function addTotalTask() {
  pub('task', 'total');
}

function addDoneTask() {
  pub('task', 'done');
}

function addCancelledTask() {
  pub('task', 'cancel');
}

module.exports = {
  addTotalTask, 
	addCancelledTask, 
	addDoneTask
};
