import React from 'react';
import Paper from 'material-ui/lib/paper';
import { Localization } from 'keysavcore';
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

function getSpecies(id, form, local) {
  if (id >= 664 && id <= 666) {
    return `${local.species[id]}-${local.forms[666][form]}`;
  } else if (id === 201) {
    return `${local.species[201]}-${local.forms[201][form]}`;
  }
  return local.species[id];
}

export default class PkmListReddit extends React.Component {
  static propTypes = {
    pokemon: React.PropTypes.object,
    language: React.PropTypes.string,
    format: React.PropTypes.object
  };

  getPlainTextBox(pkm) {
    const local = Localization[this.props.language];
    const { ghosts } = this.props.format;
    const header = '| Box | Slot | Species (Gender) | Nature | Ability | HP.ATK.DEF.SPA.SPD.SPE | HiddenPower | ESV |\n|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|\n';
    return header + (ghosts === 'hide' ? pkm.filter(e => !e.isGhost) : pkm).map(e =>
      `| ${ghosts === 'mark' && e.isGhost ? '~' : ''}` +
      `Box ${('0' + (e.box + 1)).slice(-2)} | ${Math.floor(e.slot / 6) + 1},${e.slot % 6 + 1} | ` +
      `${getSpecies(e.species, e.form, local)} (${genderString(e.gender)}) | ` +
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

  renderBox(pkm, box) {
    const local = Localization[this.props.language];
    return (
      <Paper className={styles.paper} key={box}>
        <table className={styles.table}><tbody>
          <tr><th>|Box</th><th>|Slot</th><th>|Species (Gender)</th><th>|Nature</th><th>|Ability</th><th>|HP.ATK.DEF.SPATK.SPDEF.SPE</th><th>|HP</th><th>|ESV</th><th>|</th></tr>
          <tr><th>|:---:</th><th>|:---:</th><th>|:---:</th><th>|:---:</th><th>|:---:</th><th>|:---:</th><th>|:---:</th><th>|:---:</th><th>|</th></tr>
          {pkm.map(e => this.props.format.ghosts === 'hide' && e.isGhost ?
            null :
            <tr key={e.box * 30 + e.slot} className={this.props.format.ghosts === 'mark' && e.isGhost ? styles.ghost : ''}>
              <td>|{this.props.format.ghosts === 'mark' && e.isGhost ? '~' : ''}B{('00' + (e.box + 1)).slice(-2)}</td>
              <td>|{Math.floor(e.slot / 6) + 1},{e.slot % 6 + 1}</td>
              <td>|{getSpecies(e.species, e.form, local)} ({genderString(e.gender)})</td>
              <td>|{local.natures[e.nature]}</td>
              <td>|{local.abilities[e.ability]} </td>
              {this.props.format.boldPerfectIVs ?
                <td>
                  |{e.ivHp === 31 ? <span className={styles.boldIV}>**31**</span> : e.ivHp}
                  .{e.ivAtk === 31 ? <span className={styles.boldIV}>**31**</span> : e.ivAtk}
                  .{e.ivDef === 31 ? <span className={styles.boldIV}>**31**</span> : e.ivDef}
                  .{e.ivSpAtk === 31 ? <span className={styles.boldIV}>**31**</span> : e.ivSpAtk}
                  .{e.ivSpDef === 31 ? <span className={styles.boldIV}>**31**</span> : e.ivSpDef}
                  .{e.ivSpe === 31 ? <span className={styles.boldIV}>**31**</span> : e.ivSpe}
                </td> :
                <td>|{e.ivHp}.{e.ivAtk}.{e.ivDef}.{e.ivSpAtk}.{e.ivSpDef}.{e.ivSpe}</td>
              }
              <td>|{local.types[e.hpType]}</td>
              <td>|{('0000' + e.esv).slice(-4)}</td>
              <td>|</td>
            </tr>
          )}
        </tbody></table>
      </Paper>
    );
  }

  render() {
    if (!this.props.pokemon.first()) {
      return <div></div>;
    }
    if (this.props.format.splitBoxes) {
      const grouped = this.props.pokemon.groupBy(e => e.box);
      return (
        <div>
          {grouped.map((pkm, box) => (
            <div>
              <h2 className={styles.boxNumber}><span className={styles.hide}>{this.getBoxHeader(box)} </span>Box {box + 1}</h2>
              {this.renderBox(pkm, box)}
            </div>
          )).valueSeq()}
        </div>
      );
    }

    return this.renderBox(this.props.pokemon, 0);
  }
}
