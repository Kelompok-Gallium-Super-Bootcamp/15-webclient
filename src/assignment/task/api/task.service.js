const { client } = require('../../lib/client');

async function fetchTaskApi() {
  return await client.get('http://localhost:9999/list');
}

async function addTaskApi(task) {
  await client.post('http://localhost:9999/task', task, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return task;
}

async function doneTaskApi(id) {
  return await client.put(`http:localhost:9999/done?id=${id}`);
}

async function undoneTaskApi(id) {
  return await client.put(`http:localhost:9999/done?id=${id}`);
}

async function cancelTaskApi(id) {
  return await client.delete(`http://localhost:9999/cancel?id=${id}`);
}

async function uncancelTaskApi(id) {
  return await client.delete(`http://localhost:9999/cancel?id=${id}`);
}

module.exports = {
  fetchTaskApi,
  addTaskApi,
  doneTaskApi,
  undoneTaskApi,
  cancelTaskApi,
  uncancelTaskApi,
};
