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
import makeCached from '../utils/makeCachedFunction';
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

const getSvList = createSelector(
  state => state.filter.svs,
  svs => (svs.match(/\b\d{1,4}\b/g) || []).map(sv => parseInt(sv, 10))
);

const getFilter = createSelector(
  state => state.filter,
  state => state.file.type,
  getSvList,
  (filter, type, svList) => {
    return makeCached(pkm => {
      if (type === 'SAV' &&
        (filter.lower !== undefined && filter.lower > pkm.box + 1 ||
         filter.upper !== undefined && filter.upper < pkm.box + 1)) return false;
      if (!filter.enabled) return true;
      if (filter.eggsOnly && !pkm.isEgg) return false;
      const shinyCond = !pkm.isEgg && pkm.isShiny ||
        pkm.isEgg && (filter.eggsHaveMySv && pkm.tsv === pkm.esv ||
                      svList.includes(pkm.esv));
      if (shinyCond && filter.shinyOverride) return true;
      if (!shinyCond && filter.shiniesOnly) return false;
      if (filter.gender !== '3' && filter.gender !== '' + pkm.gender) return false;
      if (filter.haOnly && pkm.abilityNum !== 4) return false;
      let needPerfects = filter.numPerfectIvs;
      const ivCompVal = Math.min(filter.hpTypes.length, 1);
      for (const [Iv, iv] of [['Hp', 'hp'], ['Def', 'def'], ['SpAtk', 'spAtk'], ['SpDef', 'spDef']]) {
        const val = pkm['iv' + Iv];
        if (31 - val <= ivCompVal) --needPerfects;
        else if (filter.ivs[iv]) return false;
      }
      if (filter.specialAttacker && pkm.ivAtk <= ivCompVal ||
         !filter.specialAttacker && 31 - pkm.ivAtk <= ivCompVal) --needPerfects;
      else if (filter.ivs.atk) return false;
      if (filter.trickroom && pkm.ivSpe <= ivCompVal ||
         !filter.trickroom && 31 - pkm.ivSpe <= ivCompVal) --needPerfects;
      else if (filter.ivs.spe) return false;
      if (needPerfects > 0) return false;
      if (filter.hpTypes.length &&
          filter.hpTypes.find(({ value }) => value === pkm.hpType) === undefined) return false;
      if (filter.species.length &&
          filter.species.find(({ value }) => value === pkm.species) === undefined) return false;
      if (filter.natures.length &&
          filter.natures.find(({ value }) => value === pkm.nature) === undefined) return false;
      if (filter.abilities.length &&
          filter.abilities.find(({ value }) => value === pkm.ability) === undefined) return false;
      if (filter.customFilter) {
        try {
          return filter.customFilter(pkm);
        } catch (e) {
          return false;
        }
      }
      return true;
    });
  }
);

const mapStateToProps = createSelector(
  getPokemonSeq,
  getFilter,
  state => state.file.name,
  state => state.file.goodKey,
  state => state.file.error,
  state => state.file.type,
  state => state.filter,
  state => state.format,
  (pokemon, filterFunction, name, goodKey, error, type, filter, format) => ({ pokemon, filterFunction, name, goodKey, error, type, filter, format })
);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ openFile, openFileWatch, dismissError, setFilterSav, setFilterBv, openDialog }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dumping);
