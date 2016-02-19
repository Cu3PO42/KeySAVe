import * as React from 'react';
import { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import IpcClient from 'electron-ipc-tunnel/client';
const styles = require('./FileOpener.module.scss');

const options = {};

const inputStyle = {
  color: 'black'
};

export default class FileOpener extends Component {
  static propTypes = {
    file: PropTypes.string.isRequired,
    fileOpened: PropTypes.func.isRequired
  };

  ipcClient = new IpcClient();

  handleClick = () => {
    setTimeout(async () => {
      try {
        const reply = await this.ipcClient.send('file-dialog-open', { options });
        if (reply !== undefined && reply[0] !== undefined) {
          this.props.fileOpened(reply[0]);
        }
      } catch (e) {/* ignore */}
    }, 500);
  };

  render() {
    return (
          <div className={styles.flexHorizontal}>
              <div className={styles.padRight}>
                  <FlatButton label="Open File" onClick={this.handleClick} className={styles.button}/>
              </div>
              <TextField floatingLabelText="File" value={this.props.file} disabled inputStyle={inputStyle} fullWidth />
          </div>
      );
  }
}
