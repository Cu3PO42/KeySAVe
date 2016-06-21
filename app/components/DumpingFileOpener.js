import React, { Component } from 'react';
import FileOpener from '../components/FileOpener';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import RadioButton from 'material-ui/RadioButton';
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FileCloudDownload from 'material-ui/svg-icons/file/cloud-download';
import NtrContainer from '../containers/NtrContainer';
import pureRender from 'pure-render-decorator';
import styles from './DumpingFileOpener.module.scss';
import { range } from 'lodash';

const menuItems1To31 = range(1, 32).map(i => <MenuItem key={i} value={i} primaryText={`${i}`} />);

@pureRender
class DumpingFileOpener extends Component {
  static propTypes = {
    file: React.PropTypes.string,
    fileOpened: React.PropTypes.func,
    backup: React.PropTypes.func,
    type: React.PropTypes.string,
    goodKey: React.PropTypes.bool,
    bvFilterChanged: React.PropTypes.func,
    savFilterChanged: React.PropTypes.func,
    lowerBox: React.PropTypes.number,
    upperBox: React.PropTypes.number,
    isOpponent: React.PropTypes.bool
  };

  lowerBoxChanged = (e, i, value) => {
    this.props.savFilterChanged(value, this.props.upperBox);
  };

  upperBoxChanged = (e, i, value) => {
    this.props.savFilterChanged(this.props.lowerBox, value);
  };

  radioChanged = (e, value) => {
    this.props.bvFilterChanged(value === 'opponentTeam');
  };

  render() {
    return (
      <Paper className={styles.paper}>
        <FileOpener fileOpened={this.props.fileOpened} file={this.props.file} />
        <div className={styles.flexFromRight}>
          <IconButton onClick={() => this.props.backup(this.props.file)} disabled={this.props.file === ''}>
            <FileCloudDownload />
          </IconButton>
          <NtrContainer />
          {this.props.type === 'SAV' ?
            <div className={styles.boxSelectorWrapper}>
              <DropDownMenu value={this.props.lowerBox} onChange={this.lowerBoxChanged}>
                {menuItems1To31.slice(0, this.props.upperBox)}
              </DropDownMenu>
              &ndash;
              <DropDownMenu value={this.props.upperBox} onChange={this.upperBoxChanged}>
                {menuItems1To31.slice(this.props.lowerBox - 1)}
              </DropDownMenu>
            </div>
          : this.props.type === 'BV' ?
            <div className={styles.radioButtonWrapper}>
              <RadioButtonGroup name="bv" onChange={this.radioChanged} valueSelected={this.props.isOpponent ? 'opponentTeam' : 'myTeam'}>
                <RadioButton value="myTeam" label="My Team" />
                <RadioButton value="opponentTeam" label="Opponent Team" disabled={!this.props.goodKey} />
              </RadioButtonGroup>
            </div>
          :
            <div></div>
          }
        </div>
        {this.props.goodKey === false && this.props.type === 'SAV' ?
          <div className={styles.keyWarning}>
            OLD STYLE KEY: SAVING TWICE REQUIRED
          </div> : undefined
        }
      </Paper>
    );
  }
}

export default DumpingFileOpener;
