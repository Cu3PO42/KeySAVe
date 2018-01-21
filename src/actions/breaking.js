import createAction from '../utils/createAction';
import { breakSavOrBv } from 'keysavcore';
import readFile from '../utils/readFile';

export const BREAKING_OPEN_FILE_1 = 'BREAKING_OPEN_FILE_1';
export const BREAKING_OPEN_FILE_2 = 'BREAKING_OPEN_FILE_2';
export const BREAK_KEY = 'BREAK_KEY';
export const DISMISS_BREAK_STATE = 'DISMISS_BREAK_STATE';
export const SCAN_FOLDER = 'SCAN_FOLDER';
export const SCAN_FOLDER_FINISH = 'SCAN_FOLDER_FINISH';

async function checkType(file) {
  try {
    const size = file[0].size;
    switch (size) {
      case 0x100000:
      case 0x10009c:
      case 0x10019a:
      case 0x0fe000:
      case 0x0fe09c:
      case 0x0fe19a:
        return {
          file,
          type: 'sav',
        };
      case 0x6e60:
      case 0x6bc0:
        return {
          file,
          type: 'bv',
        };
      default:
    }
  } catch (e) {
    /* none */
  }
  return {
    file,
    type: 'neither',
  };
}

export const openFile1 = createAction(BREAKING_OPEN_FILE_1, checkType);
export const openFile2 = createAction(BREAKING_OPEN_FILE_2, checkType);
export const breakKey = createAction(BREAK_KEY, async (file1, file2) => {
  const arr1 = await readFile(file1[0]);
  const arr2 = await readFile(file2[0]);
  return await breakSavOrBv(arr1, arr2);
});
export const dismissBreakState = createAction(DISMISS_BREAK_STATE);
export const scanFolder = createAction(SCAN_FOLDER);
export const scanFolderFinish = createAction(SCAN_FOLDER_FINISH);
