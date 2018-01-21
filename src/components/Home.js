import PropTypes from 'prop-types';
import React from 'react';
import { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import DumpingContainer from '../containers/DumpingContainer';
import FormattingContainer from '../containers/FormattingContainer';
import DialogContainer from '../containers/DialogContainer';
import BreakingContainer from '../containers/BreakingContainer';
import About from './About';
import styles from './Home.module.scss';

const tabs = ['dumping', 'options', 'breaking', 'about'];

export default class Home extends Component {
  static propTypes = {
    params: PropTypes.object,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  tabChanged = tab => {
    this.context.router.push(`/main/${tab}`);
  };

  tabIndexChanged = tab => {
    this.tabChanged(tabs[tab]);
  };

  render() {
    return (
      <div className={styles.mainWrapper}>
        <DialogContainer />
        <Tabs value={this.props.params.tab} onChange={this.tabChanged}>
          <Tab label="Dumping" value="dumping" />
          <Tab label="Options" value="options" />
          <Tab label="Breaking" value="breaking" />
          <Tab label="About" value="about" />
        </Tabs>
        <SwipeableViews
          index={tabs.indexOf(this.props.params.tab)}
          onChangeIndex={this.tabIndexChanged}
          className={styles.stretch}
        >
          <DumpingContainer />
          <FormattingContainer />
          <BreakingContainer />
          <About />
        </SwipeableViews>
      </div>
    );
  }
}
