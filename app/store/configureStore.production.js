import { createStore, applyMiddleware, compose } from 'redux';
import autoRehydrate from './autoRehydrate';
import thunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import rootReducer from '../reducers';

const enhancer = compose(applyMiddleware(thunk), applyMiddleware(reduxPromise), autoRehydrate());

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
