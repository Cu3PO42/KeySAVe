import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Seq } from 'immutable';
import { openFile, openFileWatch, dismissError } from '../actions/file';
import { setFilterBv, setFilterSav } from '../actions/filter';
import { openDialog } from '../actions/dialog';
import { send } from 'electron-ipc-tunnel/client';
import * as fse from 'fs-extra';
import * as path from 'path';
import Dumping from '../components/Dumping';

const getPokemonSeq = createSelector(
  state => state.file.pokemon,
  state => state.file.type,
  state => state.filter.isOpponent,
  (pokemon, type, isOpponent) =>
    type === 'SAV' ?
      new Seq(pokemon) :
    type === 'BV' ?
      isOpponent ? new Seq(pokemon.opponentTeam) : new Seq(pokemon.myTeam) :
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
    // TODO move this to component
    if (!res) {
      res = bindActionCreators({ openFile, openFileWatch, dismissError, setFilterSav, setFilterBv, openDialog }, dispatch);
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

export default connect(mapStateToProps, mapDispatchToProps)(Dumping);
