const { client } = require('../../lib/client');

async function fetchWorkersApi() {
  return await client.get('http://localhost:9132/worker/total');
}

async function taskDoneApi() {
  return await client.get('http://localhost:9132/task/done');
}

async function taskTotalApi() {
  return await client.get('http://localhost:9132/task/total');
}

async function taskCancelledApi() {
  return await client.get('http://localhost:9132/task/cancelled');
}
 
module.exports = {
  fetchWorkersApi,
	taskCancelledApi,
	taskDoneApi,
	taskTotalApi,
};
