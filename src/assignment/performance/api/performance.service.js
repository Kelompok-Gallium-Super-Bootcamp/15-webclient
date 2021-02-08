const { client } = require('../../lib/client');

async function fetchWorkersApi() {
  return await client.get('http://localhost:9132/worker/total');
}


 
module.exports = {
  fetchWorkersApi,
};
