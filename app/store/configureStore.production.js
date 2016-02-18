import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import rootReducer from '../reducers';

const enhancer = compose(applyMiddleware(thunk), applyMiddleware(reduxPromise));

export default function configureStore(initialState) {
    return createStore(rootReducer, initialState, enhancer);
}
