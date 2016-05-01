import {
  UPDATE_AVAILABLE,
  UPDATE_PROGRESS,
  UPDATE_DISMISS
} from '../actions/updater';
import { handleActions } from '../utils/handleAction';

const defaultState = {
  update: undefined,
  progress: undefined
};

export default handleActions({
  [UPDATE_AVAILABLE](state, { payload: update }) {
    return {
      ...state,
      update
    };
  },

  [UPDATE_PROGRESS](state, { payload: progress }) {
    return {
      ...state,
      progress
    };
  },

  [UPDATE_DISMISS]() {
    return defaultState;
  }
}, defaultState);
