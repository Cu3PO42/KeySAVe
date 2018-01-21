import React from 'react';
import { loadLocalization, loadAllStats } from 'keysavcore';

const localCache = {};
let calc = undefined;

function makeCancelable(promise) {
  const cancelable = new Promise((resolve, reject) =>
    promise.then(
      val => (cancelable.__isCanceled ? reject({ isCanceled: true }) : resolve(val)),
      err => (cancelable.__isCanceled ? reject({ isCanceled: true }) : reject(err))
    )
  );
  cancelable.__isCanceled = false;
  cancelable.cancel = function() {
    this.__isCanceled = true;
  };
  return cancelable;
}

function noop() {}

export default function loadData({ loadLocal, loadCalc }, Comp) {
  return class DataLoader extends React.Component {
    state = {};
    promises = [];

    update(props) {
      if (loadLocal) {
        const { language } = props;
        if (localCache[language]) {
          this.setState({ local: localCache[language] });
        } else {
          const p = makeCancelable(
            loadLocalization(language).then(local => (localCache[language] = local))
          );
          p.then(local => this.setState({ local }), noop);
          this.promises.push(p);
        }
      }
      if (loadCalc) {
        if (calc) {
          this.setState({ calc });
        } else {
          const p = makeCancelable(loadAllStats().then(c => (calc = c)));
          p.then(c => this.setState({ calc: c }), noop);
          this.promises.push(p);
        }
      }
    }

    componentWillReceiveProps(nextProps) {
      this.update(nextProps);
    }

    componentWillMount() {
      this.update(this.props);
    }

    componentWillUnmount() {
      this.promises.forEach(p => p.cancel());
    }

    render() {
      if ((loadLocal && !this.state.local) || (loadCalc && !this.state.calc)) {
        return <div>Loading...</div>;
      }
      return <Comp {...this.props} {...this.state} />;
    }
  };
}
