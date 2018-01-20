import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import autoRehydrate from './autoRehydrate';
import reduxPromise from 'redux-promise';
import rootReducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, reduxPromise), autoRehydrate());
export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  if (module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers').default));
  }

  return store;
}
