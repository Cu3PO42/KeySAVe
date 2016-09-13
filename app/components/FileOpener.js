import React from 'react';
import { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import IpcClient from 'electron-ipc-tunnel/client';
import styles from './FileOpener.module.scss';

const inputStyle = {
  color: 'black'
};

export default class FileOpener extends Component {
  static propTypes = {
    file: PropTypes.string.isRequired,
    fileOpened: PropTypes.func.isRequired,
    buttonText: PropTypes.string,
    inputText: PropTypes.string,
    options: PropTypes.object
  };

  ipcClient = new IpcClient();

  handleClick = () => {
    setTimeout(async () => {
      try {
        const reply = await this.ipcClient.send('file-dialog-open', { options: this.props.options });
        if (reply !== undefined && reply[0] !== undefined) {
          this.props.fileOpened(reply[0]);
        }
      } catch (e) { /* ignore */ }
    }, 500);
  };

  render() {
    return (
      <div className={styles.flexHorizontal}>
        <div className={styles.padRight}>
          <FlatButton label={this.props.buttonText || 'Open File'} onClick={this.handleClick} className={styles.button}/>
        </div>
        <TextField floatingLabelText={this.props.inputText || 'File'} value={this.props.file} disabled inputStyle={inputStyle} fullWidth />
      </div>
    );
  }
}
