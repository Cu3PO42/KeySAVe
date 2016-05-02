import React from 'react';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import ExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import ExpandLessIcon from 'material-ui/lib/svg-icons/navigation/expand-less';
import Collapse from 'react-collapse';
import styles from './Filters.module.scss';

const Filters = ({
  enabled,
  toggleFilters
}) => (
  <div className={styles.container}>
    <RaisedButton
      label={enabled ? 'Disable Filters' : 'Enable Filters'}
      labelPosition="before"
      onClick={toggleFilters}
      icon={enabled ? <ExpandLessIcon /> : <ExpandMoreIcon />}
    />
    <Collapse isOpened={enabled}>
      <div className={styles.paperWrapper}>
        <Paper className={styles.paper}>
          Hello, muh filters.
        </Paper>
      </div>
    </Collapse>
  </div>
);

export default Filters;
