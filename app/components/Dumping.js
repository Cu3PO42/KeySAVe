import React from 'react';
import DumpingFileOpener from '../components/DumpingFileOpener';
import FilterContainer from '../containers/FilterContainer';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import CopyIcon from 'material-ui/lib/svg-icons/content/content-copy';
import SaveIcon from 'material-ui/lib/svg-icons/content/save';
import ArchiveIcon from 'material-ui/lib/svg-icons/content/archive';
import { remote } from 'electron';
const clipboard = remote.require('clipboard');
import { send as ipcSend } from 'electron-ipc-tunnel/client';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as _ from 'lodash';
import sanitize from 'sanitize-filename';
import Promise from 'bluebird';
import styles from './Dumping.module.scss';


export default class Dumping extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    openFileWatch: React.PropTypes.func.isRequired,
    backup: React.PropTypes.func.isRequired,
    type: React.PropTypes.string.isRequired,
    goodKey: React.PropTypes.bool.isRequired,
    filter: React.PropTypes.object.isRequired,
    setFilterBv: React.PropTypes.func.isRequired,
    setFilterSav: React.PropTypes.func.isRequired,
    pokemon: React.PropTypes.object.isRequired,
    error: React.PropTypes.object,
    format: React.PropTypes.object.isRequired,
    openDialog: React.PropTypes.func.isRequired,
    dismissError: React.PropTypes.func.isRequired
  };

  getText() {
    const { dumper, dumperContainer } = this.refs;
    if (dumper && typeof dumper.getPlainText === 'function') {
      return dumper.getPlainText();
    }

    return dumperContainer.innerText;
  }

  copyClipboard = () => {
    clipboard.write({ text: this.getText() });
  };

  saveOutput = async () => {
    let ext;
    let filters;
    if (this.props.format.current.name.toLowerCase().indexOf('csv') !== -1) {
      ext = '.csv';
      filters = [{ name: 'CSV', extensions: ['csv'] }];
    } else if (this.props.format.current.name.toLowerCase().indexOf('json') !== -1) {
      ext = '.json';
      filters = [{ name: 'JSON', extensions: ['json'] }];
    } else {
      ext = '.txt';
      filters = [{ name: 'Text', extensions: ['txt'] }];
    }
    var filename = await ipcSend('file-dialog-save', { options:
      { defaultPath: path.basename(this.props.name, path.extname(this.props.name)) + ext, filters } });
    if (!filename) return;
    try {
      await fs.writeFileAsync(filename, '\ufeff' + this.getText(), { encoding: 'utf-8' }); // feff is the universal bom in node
      this.props.openDialog('File saved successfully!');
    } catch (e) {
      this.props.openDialog('Couldn\'t save file. Please try again.');
    }
  };

  exportPk6 = async () => {
    let ghosts = 0;
    try {
      let dbDirectory = await ipcSend(
        'file-dialog-open',
        { options: { title: 'Select a folder to save .pk6 files to',
                     properties: ['openDirectory', 'createDirectory'] } });
      if (dbDirectory === undefined || dbDirectory[0] === undefined) return;
      dbDirectory = dbDirectory[0];
      var files = await fs.readdirAsync(dbDirectory);
      const count = (await Promise.all(this.props.pokemon.map(async (pkm) => {
        if (pkm.isGhost) {
          ++ghosts;
          return;
        }
        var fileName = sanitize(`${('000' + pkm.species).slice(-3)} - ${pkm.nickname} - ${pkm.pid.toString(16)} - ${pkm.ec.toString(16)}`);
        let counter = 0;
        if (_.includes(files, fileName + '.pk6')) {
          ++counter;
          while (_.includes(files, fileName + ' (' + counter + ').pk6')) ++counter;
        }
        fileName += (counter ? ' (' + counter + ')' : '') + '.pk6';
        files.push(fileName);
        await fs.writeFileAsync(path.join(dbDirectory, fileName), new Buffer(pkm.data));
        return;
      }).toArray())).length;
      this.props.openDialog('Saved ' + (count - ghosts) + ' Pokémon.');
    } catch (e) {
      this.props.openDialog('An error occured.');
    }
  };

  render() {
    const { name, openFileWatch, backup, type, goodKey, filter, setFilterBv, setFilterSav, pokemon, error, format, dismissError } = this.props;
    return (
      <div>
        <DumpingFileOpener
          file={name}
          fileOpened={openFileWatch}
          backup={backup}
          type={type}
          goodKey={goodKey}
          lowerBox={filter.lower}
          upperBox={filter.upper}
          isOpponent={filter.isOpponent}
          bvFilterChanged={setFilterBv}
          savFilterChanged={setFilterSav}
        />
        <FilterContainer />
        <div className={`${styles.buttonRow} ${pokemon.first() ? '' : styles.hide}`}>
          <div className={styles.flexFill} />
          <IconButton onClick={this.copyClipboard} tooltip="Copy output to clibboard"><CopyIcon /></IconButton>
          <IconButton onClick={this.saveOutput} tooltip="Save output as file"><SaveIcon /></IconButton>
          <IconButton onClick={this.exportPk6} tooltip="Export .pk6 files"><ArchiveIcon /></IconButton>
        </div>
        <div className={styles.pkmContainer} ref="dumperContainer">
          <format.current.plugin.PkmList
            language={format.language}
            format={format.current.format}
            pokemon={pokemon}
            ref="dumper"
          />
        </div>
        <Dialog
          modal
          open={error !== undefined}
          actions={[<FlatButton label="Ok" primary onTouchTap={dismissError}/>]}
        >
          {((e) => {
            switch (e.name) {
              case 'NoKeyAvailableError':
                return `You have to break for this ${e.keyType === 'SAV' ? 'save' : 'battle video'} first!`;
              case 'NotASaveOrBattleVideoError':
                return `This file is neither a supported save nor a supported battle video.`;
              default:
                return `An unknown error occured: ${e}`;
            }
          })(error || {})}
        </Dialog>
      </div>
    );
  }
}
