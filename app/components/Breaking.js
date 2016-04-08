import React from 'react';
import FileOpener from './FileOpener';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import styles from './Breaking.module.scss';

const nameMap = {
  'sav': 'Save',
  'bv': 'Battle Video',
  'none': '',
  'neither': 'Neither'
};

const successMessages = {

};

const errorMessages = {
  
};

export default class Breaking extends React.Component {
  static propTypes = {
    file1: React.PropTypes.string.isRequired,
    file1Type: React.PropTypes.string.isRequired,
    file2: React.PropTypes.string.isRequired,
    file2Type: React.PropTypes.string.isRequired,
    breakState: React.PropTypes.string.isRequired,
    reply: React.PropTypes.object.isRequired,
    openFile1: React.PropTypes.func.isRequired,
    openFile2: React.PropTypes.func.isRequired,
    breakKey: React.PropTypes.func.isRequired
  }

  break = () => this.props.breakKey(this.props.file1, this.props.file2);

  render() {
    return (
      <Paper className={styles.paper}>
        <Dialog className={styles.dialog} open={this.props.breakState !== 'NONE'}>
          {this.props.breakState === 'ERROR' ?
            errorMessages[this.props.reply.name]
          : successMessages[this.props.reply]
          }
        </Dialog>
        <div className={`${styles.flexRow} ${styles.flexStretch}`}>
          <div className={styles.flexFill}>
            <div className={styles.flexRow}>
              <div className={styles.flexFill}><FileOpener file={this.props.file1} fileOpened={this.props.openFile1} inputText="File 1" /></div>
              <div className={styles.fileType}><span className={styles.fileTypeType}>Type:</span> {nameMap[this.props.file1Type]}</div>
            </div>
            <div className={styles.flexRow}>
              <div className={styles.flexFill}><FileOpener file={this.props.file2} fileOpened={this.props.openFile2} inputText="File 2" /></div>
              <div className={styles.fileType}><span className={styles.fileTypeType}>Type:</span> {nameMap[this.props.file2Type]}</div>
            </div>
          </div>
          <div className={`${styles.flexRow} ${styles.flexStretch} ${styles.buttonWrapper}`}>
            <FlatButton label="Break" disabled={this.props.file1Type !== this.props.file2Type || this.props.file1Type !== 'sav' && this.props.file2Type !== 'bv'} onTouchTap={this.break} />
          </div>
        </div>
      </Paper>
    );
  }
}
