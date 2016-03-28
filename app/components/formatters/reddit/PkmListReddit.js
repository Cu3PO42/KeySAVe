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

  render() {
    const local = Localization[this.props.language];
    const grouped = this.props.pokemon.groupBy(e => e.box);
    return this.props.pokemon.first() ? (
      <div>
        {grouped.map((pkm, box) =>
          <Paper className={styles.paper} key={box}>
            <table className={styles.table}><tbody>
              <tr><th>Box</th><th>| Slot</th><th>| Species (Gender)</th><th>| Nature</th><th>| Ability</th><th>| HP.ATK.DEF.SPATK.SPDEF.SPE</th><th>| HP</th><th>| ESV</th></tr>
              <tr><th>|:---:</th><th>|:---:</th><th>|:---:</th><th>|:---:</th><th>|:---:</th><th>|:---:</th><th>|:---:</th><th>|:---:|</th></tr>
              {pkm.map(e =>
                <tr>
                  <td>B{('00' + (e.box + 1)).slice(-2)} </td>
                  <td>| {Math.floor(e.slot / 6) + 1},{e.slot % 6 + 1} </td>
                  <td>| {getSpecies(e.species, e.form, local)} ({genderString(e.gender)}) </td>
                  <td>| {local.natures[e.nature]}</td>
                  <td>| {local.abilities[e.ability]} </td>
                  <td>| {e.ivHp}.{e.ivAtk}.{e.ivDef}.{e.ivSpAtk}.{e.ivSpDef}.{e.ivSpe} </td>
                  <td>| {local.types[e.hpType]} </td>
                  <td>| {('0000' + e.esv).slice(-4)}</td>
                </tr>
              )}
            </tbody></table>
          </Paper>
        ).valueSeq()}
      </div>
    ) : (
      <div></div>
    );
  }
}
