import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import routes from './routes';
import configureStore from './store/configureStore';
import tapEventPlugin from 'react-tap-event-plugin';
import configure from './configuration';
import './app.scss';

tapEventPlugin();
const store = configureStore();
configure(store);

const muiTheme = getMuiTheme(lightBaseTheme);

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router history={hashHistory}>
        {routes}
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
