import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import '../init/promisify-fs';
import './app.scss';
import tapEventPlugin from 'react-tap-event-plugin';

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

if (process.env.NODE_ENV !== 'production') {
}
