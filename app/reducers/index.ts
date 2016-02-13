import { combineReducers } from 'redux';
import file from "./file";
import filter from "./filter";

const rootReducer = combineReducers({
  file,
  filter
});

export default rootReducer;
