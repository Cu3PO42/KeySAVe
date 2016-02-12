import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
const styles = require('./Home.module.css');


export default class Home extends Component<{}, {}> {
  render() {
      var test: number = 10;
    return (
      <div>
        <div className={styles.container}>
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
        </div>
      </div>
    );
  }
}
