import React from 'react';
import { createSelector } from 'reselect';
import PropTypes from 'prop-types';
import loadData from '../../../containers/DataLoader';
import styles from './PkmListReddit.module.scss';

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

function getSpecies(id, form, version, local) {
  const formNames = (version === 6 ? local.forms6 : local.forms7)[id];
  if (formNames && formNames[form]) {
    return `${local.species[id]} (${formNames[form]})`;
  }
  return local.species[id];
}

class Pkm extends React.PureComponent {
  static propTypes= {
    pkm: PropTypes.object,
    language: PropTypes.string,
    format: PropTypes.object,
    hidden: PropTypes.bool,
    isEven: PropTypes.bool,
    local: PropTypes.object
  };

  render() {
    const { pkm, local } = this.props;

    return (
      <tr
        className={`${this.props.format.ghosts === 'mark' && pkm.isGhost ? styles.ghost : ''} ${this.props.isEven ? styles.even : styles.odd}`}
        style={{ display: this.props.hidden ? 'none' : undefined }}
      >
        <td>{this.props.format.ghosts === 'mark' && pkm.isGhost ? '~' : ''}B{('00' + (pkm.box + 1)).slice(-2)}</td>
        <td>{Math.floor(pkm.slot / 6) + 1},{pkm.slot % 6 + 1}</td>
        <td>{getSpecies(pkm.species, pkm.form, pkm.version, local)} ({genderString(pkm.gender)})</td>
        <td>{local.natures[pkm.nature]}</td>
        <td>{local.abilities[pkm.ability]} </td>
        {this.props.format.boldPerfectIVs ?
          <td>
             {pkm.ivHp === 31 ? <span className={styles.boldIV}>31</span> : pkm.ivHp}
            .{pkm.ivAtk === 31 ? <span className={styles.boldIV}>31</span> : pkm.ivAtk}
            .{pkm.ivDef === 31 ? <span className={styles.boldIV}>31</span> : pkm.ivDef}
            .{pkm.ivSpAtk === 31 ? <span className={styles.boldIV}>31</span> : pkm.ivSpAtk}
            .{pkm.ivSpDef === 31 ? <span className={styles.boldIV}>31</span> : pkm.ivSpDef}
            .{pkm.ivSpe === 31 ? <span className={styles.boldIV}>31</span> : pkm.ivSpe}
          </td> :
          <td>{pkm.ivHp}.{pkm.ivAtk}.{pkm.ivDef}.{pkm.ivSpAtk}.{pkm.ivSpDef}.{pkm.ivSpe}</td>
        }
        <td>{local.types[pkm.hpType]}</td>
        <td>{('0000' + pkm.esv).slice(-4)}</td>
      </tr>
    );
  }
}

@pureRender
class PkmListReddit extends React.Component {
  static propTypes = {
    pokemon: PropTypes.object,
    filterFunction: PropTypes.func.isRequired,
    language: PropTypes.string,
    format: PropTypes.object,
    local: PropTypes.object
  };

  getPlainTextBox(pkm) {
    const { local } = this.props;
    const { ghosts } = this.props.format;
    const header = '| Box | Slot | Species (Gender) | Nature | Ability | HP.ATK.DEF.SPA.SPD.SPE | Hidden Power | ESV |\n|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|\n';
    const hideGhosts = this.props.format.ghosts === 'hide';
    return header + pkm.filter(e => this.props.filterFunction(e) && (!hideGhosts || !e.isGhost)).map(e =>
      `| ${ghosts === 'mark' && e.isGhost ? '~' : ''}` +
      `B${('0' + (e.box + 1)).slice(-2)} | ${Math.floor(e.slot / 6) + 1},${e.slot % 6 + 1} | ` +
      `${getSpecies(e.species, e.form, e.version, local)} (${genderString(e.gender)}) | ` +
      `${local.natures[e.nature]} | ${local.abilities[e.ability]} | ` +
      (this.props.format.boldPerfectIVs ?
        ['Hp', 'Atk', 'Def', 'SpAtk', 'SpDef', 'Spe'].map(iv => e['iv' + iv] === 31 ? '**31**' : '' + e['iv' + iv]).join('.') :
        ['Hp', 'Atk', 'Def', 'SpAtk', 'SpDef', 'Spe'].map(iv => e['iv' + iv]).join('.')) +
      ` | ${local.types[e.hpType]} | ${('0000' + e.esv).slice(-4)} |`
    ).join('\n');
  }

  getPlainText() {
    if (this.props.format.splitBoxes) {
      const grouped = this.props.pokemon.groupBy(e => e.box);
      return grouped.map((pkm, box) =>
        `${this.getBoxHeader(box) + ' '}Box ${box + 1}\n\n${this.getPlainTextBox(pkm)}`
      ).join('\n\n');
    }

    return `${this.getBoxHeader(0)} All Boxes\n\n${this.getPlainTextBox(this.props.pokemon)}`;
  }

  getBoxHeader(box) {
    switch (this.props.format.color) {
      case 0:
        return '##';
      case 1:
        return ['###', '####', '#####', '######'][box % 4];
      case 2:
        return '###';
      case 3:
        return '####';
      case 4:
        return '#####';
      case 5:
        return '######';
      default:
        return '##';
    }
  }

  getBoxClass(box) {
    switch (this.props.format.color) {
      case 0:
        return styles.colorNone;
      case 1:
        return [styles.colorBlue, styles.colorGreen, styles.colorYellow, styles.colorRed][box % 4];
      case 2:
        return styles.colorBlue;
      case 3:
        return styles.colorGreen;
      case 4:
        return styles.colorYellow;
      case 5:
        return styles.colorRed;
      default:
        return styles.colorNone;
    }
  }

  getPokemonGroupedByBox = createSelector(
    () => this.props.pokemon,
    () => this.props.pokemon.groupBy(e => e.box)
  );

  getShowBoxMap = createSelector(
    this.getPokemonGroupedByBox,
    () => this.props.filterFunction,
    (pokemon, filter) => pokemon.map((pkm) => pkm.some(filter))
  )

  renderBox(pkm, box) {
    const hideGhosts = this.props.format.ghosts === 'hide';
    let isEven = false;
    const { local } = this.props;
    return (
      <table className={`${styles.table} ${this.getBoxClass(box)}`}><tbody>
        <tr><th>Box</th><th>Slot</th><th>Species (Gender)</th><th>Nature</th><th>Ability</th><th>HP.ATK.DEF.SPATK.SPDEF.SPE</th><th>Hidden Power</th><th>ESV</th></tr>
        {pkm.map(e => {
          const hidden = !this.props.filterFunction(e) || hideGhosts && e.isGhost;
          isEven = isEven === hidden;
          return (
            <Pkm
              key={e.box * 30 + e.slot}
              pkm={e}
              format={this.props.format}
              language={this.props.language}
              local={local}
              filterFunction={this.props.filterFunction}
              hidden={hidden}
              isEven={isEven}
            />
          );
        }).cacheResult()}
      </tbody></table>
    );
  }

  render() {
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
              <h2 className={styles.boxNumber}><span className={styles.hide}>{this.getBoxHeader(box)} </span>Box {box + 1}</h2>
              {this.renderBox(pkm, box)}
            </div>
          )).valueSeq().cacheResult()}
        </div>
      );
    }

    return this.renderBox(this.props.pokemon, 0);
  }
}

export default loadData({ loadLocal: true }, PkmListReddit);