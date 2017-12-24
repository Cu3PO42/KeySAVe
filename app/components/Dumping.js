import PropTypes from 'prop-types';
import React from 'react';
import DumpingFileOpener from '../components/DumpingFileOpener';
import FilterContainer from '../containers/FilterContainer';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import CopyIcon from 'material-ui/svg-icons/content/content-copy';
import SaveIcon from 'material-ui/svg-icons/content/save';
import ArchiveIcon from 'material-ui/svg-icons/content/archive';
import * as _ from 'lodash';
import { Pkx } from 'keysavcore';
import sanitize from 'sanitize-filename';
import Promise from 'bluebird';
import downloadFile from '../utils/downloadFile';
import styles from './Dumping.module.scss';
import copyToClipboard from 'copy-to-clipboard';


export default class Dumping extends React.Component {
  static propTypes = {
    name: PropTypes.object,
    openFile: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    keyProperties: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    generation: PropTypes.number,
    filter: PropTypes.object.isRequired,
    filterFunction: PropTypes.func.isRequired,
    setFilterBv: PropTypes.func.isRequired,
    setFilterSav: PropTypes.func.isRequired,
    pokemon: PropTypes.object.isRequired,
    error: PropTypes.object,
    format: PropTypes.object.isRequired,
    openDialog: PropTypes.func.isRequired,
    dismissError: PropTypes.func.isRequired
  };

  getText() {
    const { dumper, dumperContainer } = this.refs;
    if (dumper && typeof dumper.getPlainText === 'function') {
      return dumper.getPlainText();
    }

    return dumperContainer.innerText;
  }

  copyClipboard = () => {
    copyToClipboard(this.getText());
  };

  saveOutput = async () => {
    let ext;
    if (this.props.format.current.name.toLowerCase().indexOf('csv') !== -1) {
      ext = '.csv';
    } else if (this.props.format.current.name.toLowerCase().indexOf('json') !== -1) {
      ext = '.json';
    } else {
      ext = '.txt';
    }
    downloadFile(this.getText(), 'dump' + ext, 'text/plain');
    /*var filename = await ipcSend('file-dialog-save', { options:
      { defaultPath: path.basename(this.props.name, path.extname(this.props.name)) + ext, filters } });
    if (!filename) return;
    try {
      await fs.writeFileAsync(filename, '\ufeff' + this.getText(), { encoding: 'utf-8' }); // feff is the universal bom in node
      this.props.openDialog('File saved successfully!');
    } catch (e) {
      this.props.openDialog('Couldn\'t save file. Please try again.');
    }*/
  };

  exportPk6 = async () => {
    /*let ghosts = 0;
    try {
      let dbDirectory = await ipcSend(
        'file-dialog-open',
        { options: { title: 'Select a folder to save .pk6 files to',
                     properties: ['openDirectory', 'createDirectory'] } });
      if (dbDirectory === undefined || dbDirectory[0] === undefined) return;
      dbDirectory = dbDirectory[0];
      var files = await fs.readdirAsync(dbDirectory);
      const count = (await Promise.all(this.props.pokemon.filter(this.props.filterFunction).map(async (pkm) => {
        if (pkm.isGhost) {
          ++ghosts;
          return;
        }
        var fileName = sanitize(`${('000' + pkm.species).slice(-3)} - ${pkm.nickname} - ${pkm.pid.toString(16)} - ${pkm.ec.toString(16)}`);
        let counter = 0;
        const extension = pkm.version === 6 ? '.pk6' : '.pk7';
        if (_.includes(files, fileName + extension)) {
          ++counter;
          while (_.includes(files, fileName + ' (' + counter + ')' + extension)) ++counter;
        }
        fileName += (counter ? ' (' + counter + ')' : '') + extension;
        files.push(fileName);
        await fs.writeFileAsync(path.join(dbDirectory, fileName), new Buffer(pkm.data));
        return;
      }).toArray())).length;
      this.props.openDialog('Saved ' + (count - ghosts) + ' Pokémon.');
    } catch (e) {
      this.props.openDialog('An error occured.');
    }*/
  };

  backupFile = async () => {
    /*if (this.props.name.startsWith('TEA')) {
      const buf = new Buffer(232 * 930);
      let i = 0;
      for (const pkm of this.props.pokemon) {
        const pkxUi8 = new Uint8Array(pkm.data);
        const ekxUi8 = Pkx.encrypt(pkxUi8);
        const ekxBuf = new Buffer(ekxUi8.buffer, ekxUi8.byteOffset, ekxUi8.byteLength);
        ekxBuf.copy(buf, i, 0, 232);
        i += 232;
      }
      const dest = await ipcSend('file-dialog-save',
                               { options: { filters: [{ name: this.props.name,
                                            extensions: ['bin'] }] } });
      if (dest === undefined) {
        return;
      }
      try {
        await fs.writeFileAsync(dest, buf);
        this.props.openDialog(`${this.props.name} saved!`);
      } catch (e) {
        this.props.openDialog(`Couldn't save ${this.props.name}.`);
      }
      return;
    }
    try {
      const name = this.props.type === 'SAV' ? 'Save' : 'Battle Video';
      const dest = await ipcSend('file-dialog-save',
                               { options: { filters: [{ name: this.props.name,
                                            extensions: [path.extname(this.props.name).slice(1)] }] } });
      if (dest === undefined) {
        return;
      }
      await fs.copyAsync(this.props.name, dest);
      this.props.openDialog(`${name} backupped!`);
    } catch (e) {
      this.props.openDialog(`Couldn't backup ${name}.`);
    }*/
  }

  render() {
    const { name, openFile, type, keyProperties, generation, filter, setFilterBv, setFilterSav, pokemon, error, format, dismissError, filterFunction } = this.props;
    return (
      <div>
        <DumpingFileOpener
          file={name}
          fileOpened={openFile}
          backup={this.backupFile}
          type={type}
          keyProperties={keyProperties}
          generation={generation}
          lowerBox={filter.lower}
          upperBox={filter.upper}
          teamSelected={filter.teamSelected}
          bvFilterChanged={setFilterBv}
          savFilterChanged={setFilterSav}
        />
        <FilterContainer />
        <div className={`${styles.buttonRow} ${pokemon.first() ? '' : styles.hide}`}>
          <div className={styles.flexFill} />
          <IconButton onClick={this.copyClipboard} tooltip="Copy output to clipboard"><CopyIcon /></IconButton>
          <IconButton onClick={this.saveOutput} tooltip="Save output as file"><SaveIcon /></IconButton>
          <IconButton onClick={this.exportPk6} tooltip={`Export .pk${generation} files`}><ArchiveIcon /></IconButton>
        </div>
        <div className={styles.pkmContainer} ref="dumperContainer">
          <format.current.plugin.PkmList
            language={format.language}
            format={format.current.format}
            pokemon={pokemon}
            filterFunction={filterFunction}
            ref="dumper"
          />
        </div>
        <Dialog
          modal
          open={error !== undefined}
          actions={[<FlatButton label="Ok" primary onTouchTap={dismissError} />]}
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
