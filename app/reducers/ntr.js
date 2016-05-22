import { handleActions } from '../utils/handleAction';
import {
  OPEN_NTR_MENU,
  SET_NTR_GAME,
  SET_NTR_REGION,
  SET_NTR_IP,
  NTR_CONNECT,
  NTR_DISCONNECT
} from '../actions/ntr';

const initialState = {
  menuOpen: false,
  ip: '',
  game: 'oras',
  region: 'pal',
  client: null
};

export default handleActions({
  [OPEN_NTR_MENU](state, { payload }) {
    return {
      ...state,
      menuOpen: payload
    };
  },
  [SET_NTR_GAME](state, { payload }) {
    return {
      ...state,
      game: payload
    };
  },
  [SET_NTR_REGION](state, { payload }) {
    return {
      ...state,
      region: payload
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
  [NTR_DISCONNECT](state) {
    if (state.client !== null) {
      state.client.disconnect();
    }
    return {
      ...state,
      client: null
    };
  }
}, initialState);
