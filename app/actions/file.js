import createAction from '../utils/createAction';
import { send as ipcSend } from 'electron-ipc-tunnel/client';

export const OPEN_FILE = 'OPEN_FILE';
export const OPEN_FILE_DISMISS_ERROR = 'OPEN_FILE_DISMISS_ERROR';
export const ADD_POKEMON = 'ADD_POKEMON';

export const openFile = createAction(OPEN_FILE, file => ipcSend('dump-save-or-bv', file));
export const addPokemon = createAction(ADD_POKEMON);
export const dismissError = createAction(OPEN_FILE_DISMISS_ERROR);
