import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import '../init/promisify-fs';
import routes from './routes';
import configureStore from './store/configureStore';
import tapEventPlugin from 'react-tap-event-plugin';
import './app.scss';

tapEventPlugin();
const store = configureStore();

render(
    <Provider store={store}>
        <Router>
          {routes}
        </Router>
    </Provider>,
    document.getElementById('root')
);
