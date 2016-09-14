import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import { Localization, Calculator as StatCalculator } from 'keysavcore';
import { createSelector } from 'reselect';
import makeCached from '../../../utils/makeCachedFunction';
import styles from './PkmListLegacy.module.scss';

const replaceDatabaseFactory = format => ({
  0: '"B"+("0"+(pkm.box+1)).slice(-2)',
  1: 'Math.floor(pkm.slot/6)+1+","+(pkm.slot%6+1)',
  2: 'getSpecies(pkm.species, pkm.form, local)',
  3: 'genderString(pkm.gender)',
  4: 'local.natures[pkm.nature]',
  5: 'local.abilities[pkm.ability]',
  6: 'pkm.ivHp',
  7: 'pkm.ivAtk',
  8: 'pkm.ivDef',
  9: 'pkm.ivSpAtk',
  10: 'pkm.ivSpDef',
  11: 'pkm.ivSpe',
  12: 'local.types[pkm.hpType]',
  13: format.alwaysShowEsv ? '("0000" + pkm.esv).slice(-4)' : 'pkm.isEgg ? ("0000" + pkm.esv).slice(-4) : ""',
  14: '("0000" + pkm.tsv).slice(-4)',
  15: 'pkm.nickname',
  16: 'pkm.ot',
  17: 'local.getBallName(pkm.ball)',
  18: '("00000" + pkm.tid).slice(-5)',
  19: '("00000" + pkm.sid).slice(-5)',
  20: 'pkm.evHp',
  21: 'pkm.evAtk',
  22: 'pkm.evDef',
  23: 'pkm.evSpAtk',
  24: 'pkm.evSpDef',
  25: 'pkm.evSpe',
  26: 'moveName(local, pkm.move1)',
  27: 'moveName(local, pkm.move2)',
  28: 'moveName(local, pkm.move3)',
  29: 'moveName(local, pkm.move4)',
  30: 'moveName(local, pkm.eggMove1)',
  31: 'moveName(local, pkm.eggMove2)',
  32: 'moveName(local, pkm.eggMove3)',
  33: 'moveName(local, pkm.eggMove4)',
  34: 'pkm.isShiny ? " ★" : ""',
  35: 'pkm.isEgg ? "✓" : ""',
  36: 'StatCalculator.level(pkm)',
  37: 'local.regions[pkm.gameVersion]',
  38: 'local.countries[pkm.countryID]',
  39: 'pkm.heldItem ? local.items[pkm.heldItem] : ""',
  40: 'local.languageTags[pkm.otLang]',
  41: 'local.games[pkm.gameVersion]',
  42: 'pkm.slot+1',
  43: 'pkm.pid',
  44: 'pkm.gameVersion >= 24 && pkm.gameVersion <= 27 ? "⬟" : ""',
  45: 'pkm.species',
  46: 'pkm.form',
  47: 'pkm.ivHp === 31 ? "1" : ""',
  48: 'pkm.ivAtk === 31 ? "2" : ""',
  49: 'pkm.ivDef === 31 ? "3" : ""',
  50: 'pkm.ivSpAtk === 31 ? "4" : ""',
  51: 'pkm.ivSpDef === 31 ? "5" : ""',
  52: 'pkm.ivSpe === 31 ? "6" : ""',
  53: '(pkm.ivHp === 31) + (pkm.ivAtk === 31) + (pkm.ivAtk === 31) + (pkm.ivDef === 31) + (pkm.ivSpAtk === 31) + (iv.SpDef === 31) + (iv.Spe === 31)',
  54: 'pkm.ivHp + pkm.ivAtk + pkm.ivDef + pkm.ivSpAtk + pkm.ivSpDef + pkm.ivSpe',
  55: 'pkm.evHp + pkm.evAtk + pkm.evDef + pkm.evSpAtk + pkm.evSpDef + pkm.evSpe',
  56: 'formatDate(pkm.eggDate)',
  57: 'formatDate(pkm.metDate)',
  58: 'pkm.exp',
  59: 'props.index + 1',
  60: 'pkm.pkrsStrain ? "✓" : ""',
  61: 'pkm.pkrsStrain > 0 && pkm.pkrsDuration === 0 ? "✓" : ""',
  62: 'genderString(pkm.otGender)',
  63: 'pkm.levelMet',
  64: 'pkm.otFriendship',
  65: 'pkm.otAffection',
  66: 'pkm.isEgg ? pkm.otFriendship * 255 : ""',
  67: '"[](/" + Localization[self.props.language].items[this.ball].replace(" ", "").replace("é", "e").toLowerCase() + ")"',
  68: 'pkm.abilityNum === 4 ? "✓" : ""'
});

/* eslint-disable no-unused-vars */
function moveName(local, id) {
  return id ? local.moves[id] : '';
}
function formatDate(date) {
  return date[0] + '-' + ('0' + (date[1] + 1)).slice(-2) + '-' + ('0' + date[2]).slice(-2);
}
function genderString(gender) {
  switch (gender) {
    case 0:
      return '♂';
    case 1:
      return '♀';
    default:
      return '-';
  }
}
function getSpecies(id, form, local) {
  const forms = local.forms[id];
  if (forms && forms[form]) {
    return `${local.species[id]} (${forms[form]})`;
  }
  return local.species[id];
}

function compile(format) {
  const react = React;
  const replaceDatabase = replaceDatabaseFactory(format);
  /* eslint-enable no-unused-vars */
  /* eslint-disable no-eval */
  const fn =
    '(function(props) { var pkm = props.pkm, local = props.local; return ' +
    'react.createElement("div", { style: { display: props.hidden ? "none" : "block" } }, ' + (format.ghost === 'mark' ? 'pkm.isGhost ? "~" : "", ' : '') + '"' +
    format.format.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/{(\d+)}/g, (string, count) => `", ${replaceDatabase[count]}, "`) +
    '"); })';
  // TODO make this a pure component
  return eval(fn);
  /* eslint-enable no-eval */
}

export default class PkmListLegacy extends React.Component {
  static propTypes = {
    pokemon: React.PropTypes.object,
    filterFunction: React.PropTypes.func.isRequired,
    language: React.PropTypes.string,
    format: React.PropTypes.object
  };

  getPlainText() {
    const node = ReactDOM.findDOMNode(this);
    return node.innerText.replace(/^(Box \d+)$/gm, '\n$1\n').substring(1);
  }

  getTemplate = createSelector(
    () => this.props.format,
    compile
  )

  getPokemonGroupedByBox = createSelector(
    () => this.props.pokemon,
    (pokemon) => pokemon.groupBy(e => e.box)
  );

  getShowBoxMap = createSelector(
    this.getPokemonGroupedByBox,
    () => this.props.filterFunction,
    (pokemon, filter) => pokemon.map((pkm) => pkm.some(filter)).valueSeq().cacheResult()
  )

  renderBox(pkm) {
    const local = Localization[this.props.language];
    const Template = this.getTemplate();
    const hideGhosts = this.props.format.ghost === 'hide';
    return (
      <Paper className={styles.paper}>
        <div className={styles.box}>
          {this.props.format.header}
          {pkm.map((e, i) => <Template key={e.box * 30 + e.slot} pkm={e} index={i} local={local} hidden={!this.props.filterFunction(e) || hideGhosts && e.isGhost} />).cacheResult()}
        </div>
      </Paper>
    );
  }

  render() {
    // TODO how are ghosts hidden here?
    if (!this.props.pokemon.first()) {
      return <div></div>;
    }

    if (this.props.format.splitBoxes) {
      const grouped = this.getPokemonGroupedByBox();
      const showBoxMap = this.getShowBoxMap();

      return (
        <div>
          {grouped.map((pkm, box) => (
            <div key={box} style={{ display: showBoxMap.get(box) ? 'block' : 'none' }}>
              <h3 className={styles.boxHeader}>Box {box + 1}</h3>
              {this.renderBox(pkm)}
            </div>
          )).valueSeq().cacheResult()}
        </div>
      );
    }

    return this.renderBox(this.props.pokemon);
  }
}
