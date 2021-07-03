import React, { PureComponent } from 'react';
import FileOpener from '../components/FileOpener';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import styles from './DumpingFileOpener.module.scss';
import { createSelector } from 'reselect';

const menuItems1To31 = new Array(31)
  .fill()
  .map((_, i) => <MenuItem key={i + 1} value={i + 1} primaryText={`${i + 1}`} />);
const menuItems1To32 = [...menuItems1To31, <MenuItem key={32} value={32} primaryText="32" />];
const teamSelectors = [
  <MenuItem key={0} value={0} primaryText="My team" />,
  <MenuItem key={1} value={1} primaryText="Opponent team 1" />,
  <MenuItem key={2} value={2} primaryText="Opponent team 2" />,
  <MenuItem key={3} value={3} primaryText="Opponent team 3" />,
];

const fileOptions = {};

class DumpingFileOpener extends PureComponent {
  static propTypes = {
    file: PropTypes.object,
    fileOpened: PropTypes.func,
    backup: PropTypes.func,
    type: PropTypes.string,
    keyProperties: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    generation: PropTypes.number,
    bvFilterChanged: PropTypes.func,
    savFilterChanged: PropTypes.func,
    lowerBox: PropTypes.number,
    upperBox: PropTypes.number,
    teamSelected: PropTypes.number,
  };

  lowerBoxChanged = (e, i, value) => {
    this.props.savFilterChanged(value, this.props.upperBox);
  };

  upperBoxChanged = (e, i, value) => {
    this.props.savFilterChanged(this.props.lowerBox, value);
  };

  newTeamSelected = (e, i, value) => {
    this.props.bvFilterChanged(value);
  };

  getTeamSelectors = createSelector(
    () => this.props.type,
    () => this.props.keyProperties,
    (type, keyProperties) => teamSelectors.filter((e, i) => type !== 'BV' || keyProperties[i])
  );

  getActiveTeamSelector = createSelector(
    () => this.props.teamSelected,
    () => this.props.keyProperties,
    (teamSelected, keyProperties) => {
      if (keyProperties[teamSelected]) return teamSelected;
      for (let i = 0; i < keyProperties.length; ++i) {
        if (keyProperties[i]) return i;
      }
      return -1;
    }
  );

  render() {
    const menuItems = this.props.generation === 6 ? menuItems1To31 : menuItems1To32;
    return (
      <Paper className={styles.paper}>
        <FileOpener
          fileOpened={this.props.fileOpened}
          file={this.props.file}
          options={fileOptions}
        />
        <div className={styles.flexFromRight}>
          {this.props.type === 'SAV' ? (
            <div className={styles.boxSelectorWrapper}>
              <DropDownMenu
                value={Math.min(this.props.lowerBox, this.props.generation === 6 ? 31 : 32)}
                onChange={this.lowerBoxChanged}
              >
                {menuItems.slice(0, this.props.upperBox)}
              </DropDownMenu>
              &ndash;
              <DropDownMenu
                value={Math.min(this.props.upperBox, this.props.generation === 6 ? 31 : 32)}
                onChange={this.upperBoxChanged}
              >
                {menuItems.slice(this.props.lowerBox - 1)}
              </DropDownMenu>
            </div>
          ) : this.props.type === 'BV' ? (
            <div className={styles.boxSelectorWrapper}>
              <DropDownMenu value={this.getActiveTeamSelector()} onChange={this.newTeamSelected}>
                {this.getTeamSelectors()}
              </DropDownMenu>
            </div>
          ) : (
            <div />
          )}
        </div>
        {this.props.keyProperties === false && this.props.type === 'SAV' ? (
          <div className={styles.keyWarning}>OLD STYLE KEY: SAVING TWICE REQUIRED</div>
        ) : (
          undefined
        )}
      </Paper>
    );
  }
}

export default DumpingFileOpener;
