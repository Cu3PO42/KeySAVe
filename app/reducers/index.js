import { combineReducers } from 'redux';
import file from './file';
import filter from './filter';
import format from './format';
import dialog from './dialog';
import breaking from './breaking';
import updater from './updater';
import ntr from './ntr';

const rootReducer = combineReducers({
  file,
  filter,
  format,
  dialog,
  breaking,
  updater,
  ntr
});
export default rootReducer;
