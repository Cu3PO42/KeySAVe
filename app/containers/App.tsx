import * as React from 'react';
import { Component, PropTypes } from 'react';

interface AppProps {
    children: React.ReactElement<any>
}

export default class App extends Component<AppProps, {}> {
  static propTypes: React.ValidationMap<any> = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
        {this.props.children}
        {
          (() => {
            if (process.env.NODE_ENV !== 'production') {
              const DevTools = require('./DevTools').default;
              return <DevTools />;
            }
          })()
        }
      </div>
    );
  }
}
