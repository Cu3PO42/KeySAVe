import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import '../init';
import routes from './routes';
import configureStore from './store/configureStore';
import tapEventPlugin from 'react-tap-event-plugin';
import configure from './configuration';
import './app.scss';

tapEventPlugin();
const store = configureStore();
configure(store);

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);
