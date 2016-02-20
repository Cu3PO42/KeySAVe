import React from 'react';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Seq } from 'immutable';
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

const getPokemonSeq = createSelector(
  state => state.file.pokemon,
  state => state.file.type,
  state => state.filter.isOpponent,
  (pokemon, type, isOpponent) =>
    type === 'SAV' ?
      new Seq(pokemon) :
    type === 'BV' ?
      isOpponent ? new Seq(pokemon[1]) : new Seq(pokemon[0]) :
      new Seq()
);

const getPokemon = createSelector(
  getPokemonSeq,
  state => state.file.type,
  state => state.filter.lower,
  state => state.filter.upper,
  (pokemon, type, lower, upper) => type === 'SAV' ?
    pokemon.filter(({ box }) => lower - 1 <= box && box < upper) :
    pokemon
);

const mapStateToProps = createSelector(
  getPokemon,
  state => state.file.name,
  state => state.file.goodKey,
  state => state.file.error,
  state => state.file.type,
  state => state.filter,
  state => state.format,
  (pokemon, name, goodKey, error, type, filter, format) => ({ pokemon, name, goodKey, error, type, filter, format })
);

function mapDispatchToProps() {
  let res = undefined;
  let fileType = 'SAV';

  return (dispatch, { type }) => {
    fileType = type;
    if (!res) {
      res = bindActionCreators({ openFile, dismissError, setFilterSav, setFilterBv, openDialog }, dispatch);
      res.backup = async (file) => {
        try {
          const name = fileType === 'SAV' ? 'Save' : 'Battle Video';
          var dest = await send('file-dialog-save',
                  { options: { filters: [{ name,
                                          extensions: [path.extname(file).slice(1)] }] } });
          await fse.copyAsync(file, dest);
          dispatch(openDialog(`${name} backupped!`));
        } catch (e) {
          dispatch(openDialog(`Couldn't backup ${name}.`));
        }
      };
    }

    return res;
  };
}

const Dumping = ({ name, openFile, backup, type, goodKey, filter, setFilterBv, setFilterSav, pokemon, error, closeDialog }) => (
  <div>
      <DumpingFileOpener
        file={name}
        fileOpened={openFile}
        backup={backup}
        type={type}
        goodKey={goodKey}
        lowerBox={filter.lower}
        upperBox={filter.upper}
        isOpponent={filter.isOpponent}
        bvFilterChanged={setFilterBv}
        savFilterChanged={setFilterSav}
      />
      <PkmList pokemon={pokemon} />
      <Dialog
        modal
        open={error !== undefined}
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
        })(error || {})}
      </Dialog>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Dumping);
