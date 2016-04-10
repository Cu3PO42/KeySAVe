import createAction from '../utils/createAction';
import { send as ipcSend } from 'electron-ipc-tunnel/client';
import { watch as watchFiles } from 'chokidar';

export const OPEN_FILE = 'OPEN_FILE';
export const OPEN_FILE_DISMISS_ERROR = 'OPEN_FILE_DISMISS_ERROR';

export const openFile = createAction(OPEN_FILE, file => ipcSend('dump-save-or-bv', file));
let watcher;
export const openFileWatch = file => dispatch => {
  dispatch(openFile(file));
  if (watcher === undefined) {
    watcher = watchFiles(file);
    watcher.on('change', path => dispatch(openFile(path)));
    watcher.on('add', path => dispatch(openFile(path)));
  } else {
    watcher.unwatch('*');
    watcher.watch(file);
  }
};
export const dismissError = createAction(OPEN_FILE_DISMISS_ERROR);
