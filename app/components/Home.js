import * as React from 'react';
import { Component } from 'react';
import { Tabs, Tab } from 'material-ui';
import DumpingContainer from '../containers/DumpingContainer';
import FormattingContainer from '../containers/FormattingContainer';
import DialogContainer from '../containers/DialogContainer';
import BreakingContainer from '../containers/BreakingContainer';
import styles from './Home.module.scss';

export default class Home extends Component {
  render() {
    return (
      <div>
        <DialogContainer />
        <Tabs className={styles.tabs}>
          <Tab label="Dumping">
            <DumpingContainer />
          </Tab>
          <Tab label="Options">
            <FormattingContainer />
          </Tab>
          <Tab label="Breaking">
            <BreakingContainer />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
