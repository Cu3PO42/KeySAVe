import { handleActions } from '../utils/handleAction';
import { OPEN_FILE, OPEN_FILE_DISMISS_ERROR } from '../actions/file';

const defaultState = { name: '', isError: false };

export default handleActions({
  [OPEN_FILE]: {
    success(file, action) {
      return {
        ...action.payload,
        isError: false
      };
    },
    error(file, action) {
      return {
        name: '',
        isError: true,
        error: action.payload
      };
    }
  },
  [OPEN_FILE_DISMISS_ERROR]() {
    return defaultState;
  }
}, defaultState);
