import createAction from '../utils/createAction';
import { send as sendMessage } from 'electron-ipc-tunnel/client';

export const OPEN_FILE = 'OPEN_FILE';
export const OPEN_FILE_DISMISS_ERROR = 'OPEN_FILE_DISMISS_ERROR';

export const openFile = createAction(OPEN_FILE, file => sendMessage('dump-save-or-bv', file));
export const dismissError = createAction(OPEN_FILE_DISMISS_ERROR);
