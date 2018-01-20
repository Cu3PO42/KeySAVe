import { OPEN_DIALOG, CLOSE_DIALOG } from '../actions/dialog';
import { handleActions } from '../utils/handleAction';

const initialState = {
  message: '',
  open: false
};

export default handleActions({
  [OPEN_DIALOG](state, action) {
    return {
      message: action.payload,
      open: true
    };
  },

  [CLOSE_DIALOG]() {
    return initialState;
  }
}, initialState);
