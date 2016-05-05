import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import Markdown from 'react-markdown';
import LinearProgress from 'material-ui/lib/linear-progress';
import IpcClient from 'electron-ipc-tunnel/client';
import styles from './Updater.module.scss';

export default class Updater extends React.Component {
  static propTypes = {
    setUpdateAvailable: React.PropTypes.func.isRequired,
    setProgress: React.PropTypes.func.isRequired,
    dismissUpdate: React.PropTypes.func.isRequired,
    update: React.PropTypes.object,
    progress: React.PropTypes.number
  };

  ipcClient = new IpcClient();

  buttons = [
    <FlatButton label="Dismiss" onClick={() => this.props.dismissUpdate()} />,
    <FlatButton label="Apply Update" onClick={() => this.ipcClient.send('update-do')} />
  ];

  constructor() {
    super();
    this.ipcClient.on('update-progress', ({ percentage }) => this.props.setProgress(percentage * 100));
    (async () => {
      if (process.env.NODE_ENV === 'production') {
        const { available, changelog } = await this.ipcClient.send('update-query');
        if (available) {
          this.props.setUpdateAvailable(changelog);
        }
      }
    })();
  }

  render() {
    const { update, progress } = this.props;
    return progress === undefined ? (
      <Dialog
        modal
        open={update !== undefined}
        actions={this.buttons}
        bodyClassName={styles.dialog}
      >
        <h1>An update is available.</h1>
        <Markdown source={update ? update.changelog.map(({ name, body }) => `# ${name}\n\n${body}`).join('\n\n') : ''} />
      </Dialog>
    ) : (
      <Dialog modal open>
        <p>The update is downloading.</p>
        <p>KeySAV<sup>e</sup> will restart after it is installed.</p>
        <LinearProgress mode="determinate" value={progress} />
      </Dialog>
    );
  }
}
