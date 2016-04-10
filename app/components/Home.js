import React from 'react';
import { Component } from 'react';
import { Tabs, Tab } from 'material-ui';
import DumpingContainer from '../containers/DumpingContainer';
import FormattingContainer from '../containers/FormattingContainer';
import DialogContainer from '../containers/DialogContainer';
import BreakingContainer from '../containers/BreakingContainer';
import styles from './Home.module.scss';

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

  render() {
    return (
      <div>
        <DialogContainer />
        <Tabs
          className={styles.tabs}
          value={this.props.params.tab}
          onChange={this.tabChanged}
        >
          <Tab label="Dumping" value="dumping">
            <DumpingContainer />
          </Tab>
          <Tab label="Options" value="options">
            <FormattingContainer />
          </Tab>
          <Tab label="Breaking" value="breaking">
            <BreakingContainer />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
