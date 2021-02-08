const { client } = require('../../lib/client');

async function fetchWorkersApi() {
  return await client.get('http://localhost:9090/list');
}

async function addWorkerApi(worker) {
  return await client.post('http://localhost:9090/add', { worker });
}

module.exports = {
  fetchWorkersApi,
  addWorkerApi,
};
