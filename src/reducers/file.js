import { handleActions } from '../utils/handleAction';
import { OPEN_FILE, OPEN_FILE_DISMISS_ERROR, ADD_POKEMON } from '../actions/file';

const defaultState = {
  name: undefined,
  isError: false,
  keyProperties: undefined,
  type: '',
  generation: undefined,
  error: undefined,
  pokemon: undefined,
};

export default handleActions(
  {
    [OPEN_FILE]: {
      success(file, action) {
        return {
          ...action.payload,
          isError: false,
        };
      },
      error(file, action) {
        return {
          name: '',
          isError: true,
          error: action.payload,
        };
      },
    },
    [ADD_POKEMON](state, { payload }) {
      if (state.type !== '' && !state.isError) {
        return {
          ...state,
          pokemon: [...state.pokemon, ...payload],
        };
      }

      return state;
    },
    [OPEN_FILE_DISMISS_ERROR]() {
      return defaultState;
    },
  },
  defaultState
);
