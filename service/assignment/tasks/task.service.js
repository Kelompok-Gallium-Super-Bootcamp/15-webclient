const Busboy = require('busboy');
const url = require('url');
const { Writable } = require('stream');
const {
  writeDataTask,
  doneDataTask,
  cancelDataTask,
  readTask,
  ERROR_REGISTER_DATA_INVALID,
  ERROR_DATA_NOT_FOUND,
  ERROR_ASSIGNEE_ID_NOT_FOUND,
  ERROR_ALREADY_DONE,
  ERROR_ALREADY_CANCEL,
} = require('./task');
const { saveFile, randomFileName } = require('../lib/storage');
const { addTotalTask, addCancelledTask, addDoneTask } = require('./task.nats');

function createTaskSvc(req, res) {
  const busboy = new Busboy({ headers: req.headers });

  let finished;

  const data = {
    job: '',
    assigneeId: 0,
    attachment: '',
    done: false,
    cancel: false,
  };

  function abort() {
    req.unpipe(busboy);
    if (!req.aborted) {
      res.statusCode = 413;
      res.end();
    }
  }

  busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
    switch (fieldname) {
      case 'attachment':
        try {
          data.attachment = await saveFile('attachment', file, mimetype);
        } catch (err) {
          abort();
        }
        if (finished) {
          try {
            await writeDataTask(data);
            addTotalTask();
            res.setHeader('content-type', 'application/json');
            res.write(JSON.stringify(data));
          } catch (err) {
            if (err === ERROR_REGISTER_DATA_INVALID) {
              res.statusCode = 401;
            } else if (err === ERROR_ASSIGNEE_ID_NOT_FOUND) {
              res.statusCode = 404;
            } else {
              res.statusCode = 500;
            }
            res.write(JSON.stringify(err));
          } finally {
            res.end();
          }
        }
        break;
      default: {
        const noop = new Writable({
          write(chunk, encding, callback) {
            setImmediate(callback);
          },
        });
        file.pipe(noop);
      }
    }
  });

  busboy.on('field', (fieldname, val) => {
    if (['job', 'assigneeId', 'done', 'cancel'].includes(fieldname)) {
      data[fieldname] = val;
    }
  });

  busboy.on('finish', async () => {
    finished = true;
  });

  req.on('aborted', abort);
  busboy.on('error', abort);

  req.pipe(busboy);
}

async function doneTaskSvc(req, res) {
  const uri = url.parse(req.url, true);
  const id = uri.query['id'];
  if (!id) {
    res.statusCode = 401;
    res.write('parameter id tidak ditemukan');
    res.end();
    return;
  }
  try {
    const tasks = await doneDataTask(id);
    addDoneTask();
    res.setHeader('content-type', 'application/json');
    res.statusCode = 200;
    res.write(JSON.stringify(tasks));
    res.end();
  } catch (err) {
    if (err === ERROR_DATA_NOT_FOUND) {
      res.statusCode = 404;
      res.write(err);
      res.end();
      return;
    }
    res.statusCode = 500;
    res.end();
    return;
  }
}

async function cancelTaskSvc(req, res) {
  const uri = url.parse(req.url, true);
  const id = uri.query['id'];
  if (!id) {
    res.statusCode = 401;
    res.write('parameter id tidak ditemukan');
    res.end();
    return;
  }
  try {
    const tasks = await cancelDataTask(id);
    addCancelledTask();
    res.setHeader('content-type', 'application/json');
    res.statusCode = 200;
    res.write(JSON.stringify(tasks));
    res.end();
  } catch (err) {
    if (err === ERROR_DATA_NOT_FOUND) {
      res.statusCode = 404;
      res.write(err);
      res.end();
      return;
    }
    res.statusCode = 500;
    res.end();
    return;
  }
}

async function listTaskSvc(req, res) {
  try {
    const tasks = await readTask();
    res.setHeader('content-type', 'application/json');
    res.write(JSON.stringify(tasks));
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.end();
    return;
  }
}

module.exports = {
  createTaskSvc,
  doneTaskSvc,
  cancelTaskSvc,
  listTaskSvc,
};
