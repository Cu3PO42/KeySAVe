import React from 'react';
import { Component } from 'react';
import DumpingFileOpener from '../components/DumpingFileOpener';
import { openFile, dismissError } from '../actions/file';
import { setFilterBv, setFilterSav } from '../actions/filter';
import { openDialog } from '../actions/dialog';
import PkmList from '../components/PkmList';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import { send } from 'electron-ipc-tunnel/client';
import * as fse from 'fs-extra';
import * as path from 'path';

export default class Home extends Component {
  static contextTypes = {
    store: React.PropTypes.object
  };

  state = {
    file: '',
    pokemon: [],
    dialogOpen: false,
    type: '',
    dialogMessage: '',
    goodKey: false,
    boxFilter: () => true,
    lowerBox: 1,
    upperBox: 31,
    isOpponent: false,
    error: undefined
  };

  componentWillMount() {
    this.unsubscribe = this.context.store.subscribe(() => this.updateState());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  updateState() {
    this.updateStateFile();
    this.updateStateFilter();
  }

  updateStateFile() {
    const { name, pokemon, type, isError, error, goodKey } = this.context.store.getState().file;
    if (name === '') {
      if (isError) {
        this.setState({ file: '', pokemon: [], type: '', goodKey: false, error });
      } else {
        this.setState({ file: '', pokemon: [], type: '', goodKey: false, error: undefined });
      }
    } else {
      this.setState({ file: name, pokemon, type, goodKey, error: undefined });
    }
  }

  updateStateFilter() {
    const { filter, file } = this.context.store.getState();
    if (file.data !== undefined) {
      const { type } = file.data;
      const { lower, upper, isOpponent } = filter;
      this.setState({ lowerBox: lower, upperBox: upper, isOpponent });
      if (type === 'SAV') {
        this.setState({ boxFilter(pkm) {
          return lower - 1 <= pkm.box && pkm.box < upper;
        } });
      } else {
        this.setState({ boxFilter() {
          return true;
        } });
      }
    }
  }

  fileOpened = file => {
    const { store } = this.context;
    store.dispatch(openFile(file));
  };

  backup = async (file) => {
    try {
      const name = this.state.type === 'SAV' ? 'Save' : 'Battle Video';
      var dest = await send('file-dialog-save',
              { options: { filters: [{ name,
                                      extensions: [path.extname(file).slice(1)] }] } });
      await fse.copyAsync(file, dest);
      this.context.store.dispatch(openDialog(`${name} backupped!`));
    } catch (e) {
      console.log(e);
      this.context.store.dispatch(openDialog(`Couldn't backup ${name}.`));
    }
  };

  updateSavFilter = (lower, upper) => {
    this.context.store.dispatch(setFilterSav(lower, upper));
  };

  updateBvFilter = isOpponent => {
    this.context.store.dispatch(setFilterBv(isOpponent));
  };

  render() {
    const closeDialog = () => this.context.store.dispatch(dismissError());
    return (
          <div>
              <DumpingFileOpener
                file={this.state.file}
                fileOpened={this.fileOpened}
                backup={this.backup}
                type={this.state.type}
                goodKey={this.state.goodKey}
                lowerBox={this.state.lowerBox}
                upperBox={this.state.upperBox}
                isOpponent={this.state.isOpponent}
                bvFilterChanged={this.updateBvFilter}
                savFilterChanged={this.updateSavFilter}
              />
              <PkmList pokemon={this.state.type === 'BV' ?
                               (this.state.isOpponent && this.state.goodKey ?
                                    this.state.pokemon[1] :
                                    this.state.pokemon[0]) :
                                this.state.pokemon} filter={this.state.boxFilter}
              />
              <Dialog
                modal
                open={this.state.error !== undefined}
                actions={[<FlatButton label="Ok" primary onTouchTap={closeDialog}/>]}
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
                })(this.state.error || {})}
              </Dialog>
          </div>
      );
  }
}
