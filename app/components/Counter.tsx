import * as React from 'react';
import { Component, PropTypes } from 'react';
import { Link } from 'react-router';
const styles = require('./Counter.module.scss');

interface CounterProps {
    increment: () => void;
    incrementIfOdd: () => void;
    incrementAsync: () => void;
    decrement: () => void;
    counter: number;
}

class Counter extends Component<CounterProps, {}> {
  static propTypes: React.ValidationMap<any> = {
    increment: PropTypes.func.isRequired,
    incrementIfOdd: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired
  };

  render() {
    const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
    return (
      <div>
        <div className={styles.backButton}>
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div className={`counter ${styles.counter}`}>
          {counter}
        </div>
        <div className={styles.btnGroup}>
          <button className={styles.btn} onClick={increment}>
            <i className="fa fa-plus"></i>
          </button>
          <button className={styles.btn} onClick={decrement}>
            <i className="fa fa-minus"></i>
          </button>
          <button className={styles.btn} onClick={incrementIfOdd}>odd</button>
          <button className={styles.btn} onClick={incrementAsync}>async</button>
        </div>
      </div>
    );
  }
}

export default Counter;
