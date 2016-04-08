import createAction from '../utils/createAction';
import fs from 'fs-extra';
import { send as ipcSend } from 'electron-ipc-tunnel/client';

export const BREAKING_OPEN_FILE_1 = 'BREAKING_OPEN_FILE_1';
export const BREAKING_OPEN_FILE_2 = 'BREAKING_OPEN_FILE_2';
export const BREAK_KEY = 'BREAK_KEY';
export const DISMISS_BREAK_STATE = 'DISMISS_BREAK_STATE';
export const SCAN_FOLDER = 'SCAN_FOLDER';
export const SCAN_FOLDER_FINISH = 'SCAN_FOLDER_FINISH';

async function checkType(file) {
  try {
    const stat = await fs.statAsync(file);
    switch (stat.size) {
      case 0x100000:
      case 0x10009C:
      case 0x10019A:
        return {
          file,
          type: 'sav'
        };
      case 0x6E60:
        return {
          file,
          type: 'bv'
        };
      default:
    }
  } catch (e) { /* none */ }
  return {
    file,
    type: 'neither'
  };
}

export const openFile1 = createAction(BREAKING_OPEN_FILE_1, checkType);
export const openFile2 = createAction(BREAKING_OPEN_FILE_2, checkType);
export const breakKey = createAction(BREAK_KEY, (file1, file2) => ipcSend('break-key', { file1, file2 }));
export const dismissBreakState = createAction(DISMISS_BREAK_STATE);
export const scanFolder = createAction(SCAN_FOLDER, folder => folder);
export const scanFolderFinish = createAction(SCAN_FOLDER_FINISH);
