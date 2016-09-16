import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import autoRehydrate from './autoRehydrate';
import reduxPromise from 'redux-promise';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

const enhancer = compose(applyMiddleware(thunk), applyMiddleware(reduxPromise), autoRehydrate(), DevTools.instrument(), persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)));
export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  if (module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers').default));
  }

  return store;
}
