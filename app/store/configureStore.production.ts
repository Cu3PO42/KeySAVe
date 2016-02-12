import { createStore, applyMiddleware, compose } from 'redux';
import * as thunk from 'redux-thunk';
import rootReducer from '../reducers';

const enhancer: () => any = <any>compose(
  applyMiddleware(thunk)
);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
