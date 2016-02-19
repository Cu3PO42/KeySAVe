import { handleActions } from '../utils/handleAction';
import { SET_FILTER_BV, SET_FILTER_SAV } from '../actions/filter';

const initialFilter = {
  isOpponent: false,
  lower: 1,
  upper: 31
};

function setFilter(state, action) {
  return {
    ...state,
    ...action.payload
  };
}

export default handleActions({
  [SET_FILTER_BV]: setFilter,
  [SET_FILTER_SAV]: setFilter
}, initialFilter);
