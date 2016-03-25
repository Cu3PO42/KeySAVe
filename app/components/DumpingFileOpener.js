import React, { Component } from 'react';
import FileOpener from '../components/FileOpener';
import Paper from 'material-ui/lib/paper';
import IconButton from 'material-ui/lib/icon-button';
import Slider from 'material-ui/lib/slider';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import FileCloudDownload from 'material-ui/lib/svg-icons/file/cloud-download';
import pureRender from 'pure-render-decorator';
import styles from './DumpingFileOpener.module.scss';

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

  lowerBoxChanged = (e, value) => {
    if (value <= this.props.upperBox) {
      this.props.savFilterChanged(value, this.props.upperBox);
    } else {
      this.props.savFilterChanged(value, value);
    }
  };

  upperBoxChanged = (e, value) => {
    if (this.props.lowerBox <= value) {
      this.props.savFilterChanged(this.props.lowerBox, value);
    } else {
      this.props.savFilterChanged(value, value);
    }
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
          {this.props.type === 'SAV' ?
            <div className={styles.sliderWrapper}>
              <Slider min={1} max={31} step={1} value={Math.min(this.props.lowerBox, this.props.upperBox)} onChange={this.lowerBoxChanged} name="firstBox" style={{ width: '100px', marginRight: '10px' }} />
              <Slider min={1} max={31} step={1} value={Math.max(this.props.lowerBox, this.props.upperBox)} onChange={this.upperBoxChanged} name="secondBox" style={{ width: '100px' }} />
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
