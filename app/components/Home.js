import React from 'react';
import { Component } from 'react';
import { Tabs, Tab } from 'material-ui';
import SwipeableViews from 'react-swipeable-views';
import DumpingContainer from '../containers/DumpingContainer';
import FormattingContainer from '../containers/FormattingContainer';
import DialogContainer from '../containers/DialogContainer';
import BreakingContainer from '../containers/BreakingContainer';
import styles from './Home.module.scss';

const tabs = ['dumping', 'options', 'breaking'];

export default class Home extends Component {
  static propTypes = {
    params: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  tabChanged = (tab) => {
    this.context.router.push(`/main/${tab}`);
  }

  tabIndexChanged = (tab) => {
    this.tabChanged(tabs[tab]);
  }

  render() {
    return (
      <div className={styles.mainWrapper}>
        <DialogContainer />
        <Tabs
          value={this.props.params.tab}
          onChange={this.tabChanged}
        >
          <Tab label="Dumping" value="dumping" />
          <Tab label="Options" value="options" />
          <Tab label="Breaking" value="breaking" />
        </Tabs>
        <SwipeableViews
          index={tabs.indexOf(this.props.params.tab)}
          onChangeIndex={this.tabIndexChanged}
          className={styles.stretch}
        >
          <DumpingContainer />
          <FormattingContainer />
          <BreakingContainer />
        </SwipeableViews>
      </div>
    );
  }
}
