import React from 'react';
import { Component, PropTypes } from 'react';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
        {this.props.children}
        {(function renderDevTools() {
          if (process.env.NODE_ENV !== 'production') {
            const DevTools = require('./DevTools').default;
            return <DevTools />;
          }
        })()}
      </div>
    );
  }
}
