import { combineReducers } from 'redux';
import file from './file';
import filter from './filter';
import format from './format';
import dialog from './dialog';

const rootReducer = combineReducers({
  file,
  filter,
  format,
  dialog
});
export default rootReducer;
