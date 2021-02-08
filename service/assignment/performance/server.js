const { createServer } = require('http');
const url = require('url');
const { stdout } = require('process');
const {
  workerTotalSvc,
  taskCancelledSvc,
  taskDoneSvc,
  taskTotalSvc,
} = require('./performance.service');

let server;

/**
 * run server
 */
function run() {
  server = createServer((req, res) => {
    // handle preflight request
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    function respond(statusCode, message) {
      res.statusCode = statusCode || 200;
      res.write(message || '');
      res.end();
    }

    // route service based on its pathname
    try {
      const uri = url.parse(req.url, true);
      switch (uri.pathname) {
        case '/worker/total':
          if (req.method === 'GET') {
            return workerTotalSvc(req, res);
          } else {
            respond(404);
          }
          break;
        case '/task/total':
          if (req.method === 'GET') {
            return taskTotalSvc(req, res);
          } else {
            respond(404);
          }
          break;
        case '/task/done':
          if (req.method === 'GET') {
            return taskDoneSvc(req, res);
          } else {
            respond(404);
          }
          break;
        case '/task/cancelled':
          if (req.method === 'GET') {
            return taskCancelledSvc(req, res);
          } else {
            respond(404);
          }
          break;
        default:
          respond(404);
      }
    } catch (err) {
      respond(500, 'unkown server error');
    }
  });

  // run server
  const PORT = 9132;
  server.listen(PORT, () => {
    stdout.write(`🚀 server listening on port ${PORT}\n`);
  });
}

/**
 * stop server
 */
function stop() {
  if (server) {
    server.close();
  }
}

module.exports = {
  run,
  stop,
};
