import { app } from 'electron';
import Promise from 'bluebird';
import registerIpc from 'electron-ipc-tunnel/server';
import { fork } from 'child_process';

function deserializeError(e) {
  var res = new Error(e.message);
  res.name = e.name;
  Object.assign(res, e.props);
  return res;
}

export default function () {
  var worker = fork(__dirname + '/../workers/bootstrap.js', [__dirname + '/../workers/dumper', app.getPath('userData') + '/keys']);

  app.on('window-all-closed', () => {
    worker.send({ cmd: 'close' });
  });

  var id: number = 0;
  var promises: { [id: number]: { resolve: Function, reject: Function} } = {};

  function storePromise(resolve, reject) {
    promises[id++] = { resolve, reject };
  }

  registerIpc('dump-save-or-bv', async function dumpSaveOrBv(reply, args) {
    worker.send({ cmd: 'dump-save-or-bv', file: args, id });
    return new Promise(storePromise);
  });

  registerIpc('break-key', async function breakKey(reply, args) {
    worker.send({ cmd: 'break-key', file1: args.file1, file2: args.file2, id });
    return new Promise(storePromise);
  });

  registerIpc('break-folder', async function breakFolder(reply, folder) {
    worker.send({ cmd: 'break-folder', folder, id });
    return new Promise(storePromise);
  });

  worker.on('message', function onMessage(res) {
    if (res.err === undefined) {
      promises[res.id].resolve(res.res);
    } else {
      promises[res.id].reject(deserializeError(res.err));
    }
    delete promises[res.id];
  });
}
