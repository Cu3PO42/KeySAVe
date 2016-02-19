import * as React from 'react';
import { Component } from 'react';
import { Tabs, Tab } from 'material-ui';
import DumpingContainer from '../containers/DumpingContainer';
import FormattingContainer from '../containers/FormattingContainer';
import styles from './Home.module.scss';

export default class Home extends Component {
  render() {
    return (
      <Tabs>
        <Tab label="Dumping">
          <DumpingContainer />
        </Tab>
        <Tab label="Options">
          <FormattingContainer />
        </Tab>
      </Tabs>
    );
  }
}
