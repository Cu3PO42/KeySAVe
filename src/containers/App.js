import PropTypes from 'prop-types';
import React from 'react';
import { Component } from 'react';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return <div>{this.props.children}</div>;
  }
}
