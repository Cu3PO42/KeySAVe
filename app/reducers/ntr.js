import { handleActions } from '../utils/handleAction';
import {
  OPEN_NTR_MENU,
  SET_NTR_IP,
  NTR_CONNECT,
  NTR_DISCONNECT,
  NTR_SET_IN_PROGRESS,
  NTR_CANCEL_IN_PROGRESS
} from '../actions/ntr';

const initialState = {
  menuOpen: false,
  ip: '',
  client: null,
  intervalId: null,
  inProgress: ''
};

export default handleActions({
  [OPEN_NTR_MENU](state, { payload }) {
    return {
      ...state,
      menuOpen: payload
    };
  },
  [SET_NTR_IP](state, { payload }) {
    return {
      ...state,
      ip: payload
    };
  },
  [NTR_CONNECT](state, { payload }) {
    return {
      ...state,
      client: payload
    };
  },
  [NTR_SET_IN_PROGRESS](state, { payload }) {
    if (state.intervalId !== null) {
      clearInterval(state.intervalId);
    }
    return {
      ...state,
      ...payload
    };
  },
  [NTR_CANCEL_IN_PROGRESS](state) {
    if (state.intervalId !== null) {
      clearInterval(state.intervalId);
    }
    return {
      ...state,
      intervalId: null,
      inProgress: ''
    };
  },
  [NTR_DISCONNECT](state) {
    if (state.client !== null) {
      state.client.disconnect();
      if (state.intervalId !== null) {
        clearInterval(state.intervalId);
      }
    }
    return {
      ...state,
      client: null,
      intervalId: null,
      inProgress: ''
    };
  }
}, initialState);
