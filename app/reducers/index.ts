import { combineReducers } from 'redux';
import file from "./file";
import filter from "./filter";
import format from "./format";

const rootReducer = combineReducers({
  file,
  filter,
  format
});

export default rootReducer;
