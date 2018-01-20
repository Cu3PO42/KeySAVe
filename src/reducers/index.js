import { combineReducers } from 'redux';
import file from './file';
import filter from './filter';
import format from './format';
import dialog from './dialog';
import breaking from './breaking';

const rootReducer = combineReducers({
  file,
  filter,
  format,
  dialog,
  breaking,
});
export default rootReducer;
