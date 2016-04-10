import React from 'react';
import FileOpener from './FileOpener';
import { send as ipcSend } from 'electron-ipc-tunnel/client';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import WarningIcon from 'material-ui/lib/svg-icons/alert/warning';
import ErrorIcon from 'material-ui/lib/svg-icons/alert/error';
import CircularProgress from 'material-ui/lib/circular-progress';
import styles from './Breaking.module.scss';
import colors from 'material-ui/lib/styles/colors';

function stringOrObjOrUndefined(props, propName, componentName) {
  const val = props[propName];
  if (val === undefined || typeof val === 'string' || val instanceof String || val instanceof Error) {
    return null;
  }

  return Error(`${propName} in ${componentName || 'ANONYMOUS'} should be either a string or an Error object.`);
}

const nameMap = {
  'sav': 'Save',
  'bv': 'Battle Video',
  'none': '',
  'neither': 'Neither'
};

const WarningSign = () => <div className={styles.iconContainer}><WarningIcon color={colors.yellow600} /></div>;
const ErrorSign = () => <div className={styles.iconContainer}><ErrorIcon color={colors.red800} /></div>;

const successMessages = {
  // Battle Video Breaking success messages
  CREATED_WITH_OPPONENT:
    <div>
      <p>A key for this battle video slot was successfully created.</p>
      <p>You can dump opponent data with this key, too!</p>
    </div>,
  CREADTED_WITHOUT_OPPONENT:
    <div>
      <p>A key for this battle video slot was successfully created.</p>
      <p>You can not dump opponent data with this key, but you can upgrade it later!</p>
    </div>,
  UPGRADED_WITH_OPPONENT:
    <div>
      <p>Your key for this battle video slot was just upgraded to decrypt opponent data, too!</p>
    </div>,
  NOT_UPGRADED_WITH_OPPONENT:
    <div>
      <WarningSign />
      <p>You already have a key for this battle video slot, but it can't decrypt opponent data!</p>
      <p>Unfortunately these videos can't be used to generate the key for opponent data, either, please follow the instructions.</p>
    </div>,

  // Save breaking success messages
  CREATED_NEW:
    <div>
      <p>A key for this save was successfully created.</p>
      <p>Saving twice will not be required.</p>
      <p>Please remember that only slots 1-6 in the first two boxes are fully unlocked.</p>
    </div>,
  CREATED_OLD:
    <div>
      <p>A key for this save was successfully created.</p>
      <p>Saving twice will be required. It is recommended you upgrade at the earliers convenience.</p>
      <p>Please remember that only slots 1-6 in the first two boxes are fully unlocked.</p>
    </div>,
  UPGRADED:
    <div>
      <p>Your key for this save was successfully upgraded to a new style key.</p>
      <p>Saving twice will no longer be required.</p>
    </div>,
  NOT_UPGRADED:
    <div>
      <WarningSign />
      <p>Your key for this save could not be upgraded to a new style key.</p>
      <p>Please follow the instructions.</p>
    </div>
};

const errorMessages = {
  // Battle video breaking failure messages
  NotABattleVideoError: e =>
    <div>
      <ErrorSign />
      <p>Unfortunately the {['first', 'second'][e.file - 1]} file is not a valid battle video!</p>
    </div>,
  NotSameBattleVideoSlotError: () =>
    <div>
      <ErrorSign />
      <p>The two battle videos you're using are not from the same battle video slot and cannot be used together top create a key!</p>
      <p>Please follow the instructions.</p>
    </div>,
  BattleVideoKeyAlreadyExistsError: () =>
    <div>
      <WarningSign />
      <p>You already have a key for this batte video slot!</p>
      <p>Decryption of opponent data is supported on this slot!</p>
    </div>,

  // Save breaking error messages
  NotASaveError: e =>
    <div>
      <ErrorSign />
      <p>Unfortunately the {['first', 'second'][e.file - 1]} file is not a valid save file.</p>
    </div>,
  NotSameGameError: () =>
    <div>
      <ErrorSign />
      <p>The two save files are not from the same game and cannot be used together to create a key.</p>
      <p>Please follow the instructions.</p>
    </div>,
  SaveIdenticalError: () =>
    <div>
      <ErrorSign />
      <p>The two save files are identical.</p>
      <p>Please follow the instructions.</p>
    </div>,
  SaveKeyAlreadyExistsError: () =>
    <div>
      <WarningSign />
      <p>You already have a key for this save file that does not require saving twice.</p>
    </div>,
  NoBoxesError: () =>
    <div>
      <ErrorSign />
      <p>Could not find your boxes in the save file.</p>
      <p>This error occurs if you did not follow the instructions or are using an unsupported game.</p>
      <p>Please follow the instructions.</p>
    </div>,
  PokemonNotSuitableError: () =>
    <div>
      <ErrorSign />
      <p>The six Pokémon you used for the breaking process are not suitable.</p>
      <p>There is a one in 4096 chance for this to happen.</p>
      <p>Please use six different Pokémon and start over!</p>
    </div>
};

export default class Breaking extends React.Component {
  static propTypes = {
    file1: React.PropTypes.string.isRequired,
    file1Type: React.PropTypes.string.isRequired,
    file2: React.PropTypes.string.isRequired,
    file2Type: React.PropTypes.string.isRequired,
    breakState: React.PropTypes.string.isRequired,
    breakFolder: React.PropTypes.string.isRequired,
    reply: stringOrObjOrUndefined,
    openFile1: React.PropTypes.func.isRequired,
    openFile2: React.PropTypes.func.isRequired,
    breakKey: React.PropTypes.func.isRequired,
    dismissBreakState: React.PropTypes.func.isRequired,
    scanFolder: React.PropTypes.func.isRequired,
    scanFolderFinish: React.PropTypes.func.isRequired
  }

  break = () => this.props.breakKey(this.props.file1, this.props.file2);
  closeDialog = () => this.props.dismissBreakState();
  scanFolder = async () => {
    const folder = await ipcSend('file-dialog-open', { options: { properties: ['openDirectory'] } });
    if (folder === undefined || folder[0] === undefined) return;
    this.props.scanFolder(folder[0]);
    await ipcSend('break-folder', folder[0]);
    this.props.scanFolderFinish();
  }

  render() {
    return (
      <div>
        <Dialog open={this.props.breakFolder !== ''} className={styles.center} modal>
          Scanning <span className={styles.folder}>{this.props.breakFolder}</span> for saves.
          <div className={styles.spinnerContainer}><CircularProgress /></div>
        </Dialog>
        <Paper className={styles.paper}>
          <Dialog
            className={styles.dialog}
            open={this.props.breakState !== 'NONE'}
            actions={[<FlatButton onClick={this.closeDialog} label="OK" primary />]}
          >
            {this.props.breakState === 'ERROR' ?
              errorMessages[this.props.reply.name](this.props.reply)
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
        <Paper className={styles.paper}>
          Scan all saves in a folder to improve your save keys.
          This will use all saves for which you have a key to unlock more slots in your keys.
          Please read the manual for more info.
          <div className={styles.flexFromRight}><FlatButton label="Scan Folder" onClick={this.scanFolder} /></div>
        </Paper>
      </div>
    );
  }
}
