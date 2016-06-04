import { app } from 'electron';
import Promise from 'bluebird';
import logger, { registerIpc } from '../logger';
import { fork } from 'child_process';

function deserializeError(e) {
  var res = new Error(e.message);
  res.name = e.name;
  Object.assign(res, e.props);
  return res;
}

var worker = fork(__dirname + '/../workers/bootstrap.js', [__dirname + '/../workers/dumper', app.getPath('userData') + '/keys']);

export default () => {
  app.on('window-all-closed', () => {
    worker.send({ cmd: 'close' });
  });
};

var id: number = 0;
var promises: { [id: number]: { resolve: Function, reject: Function} } = {};

function storePromise(resolve, reject) {
  promises[id++] = { resolve, reject };
}

function skipArg1(fn) {
  return function (reply, ...args) {
    return fn.apply(this, args);
  };
}

export async function dumpSaveOrBv(args) {
  worker.send({ cmd: 'dump-save-or-bv', file: args, id });
  return new Promise(storePromise);
}
registerIpc('dump-save-or-bv', skipArg1(dumpSaveOrBv));

export async function breakKey(args) {
  worker.send({ cmd: 'break-key', file1: args.file1, file2: args.file2, id });
  return new Promise(storePromise);
}
registerIpc('break-key', skipArg1(breakKey));

export async function breakFolder(folder) {
  worker.send({ cmd: 'break-folder', folder, id });
  return new Promise(storePromise);
}
registerIpc('break-folder', skipArg1(breakFolder));

export async function mergeKeyFolder(folder) {
  worker.send({ cmd: 'merge-key-folder', folder, id });
  return new Promise(storePromise);
}
registerIpc('merge-key-folder', skipArg1(mergeKeyFolder));

worker.on('message', function onMessage(res) {
  if (res.log) {
    logger.log(res.log, ...res.args);
  } else if (res.err === undefined) {
    promises[res.id].resolve(res.res);
  } else {
    promises[res.id].reject(deserializeError(res.err));
  }
  delete promises[res.id];
});
