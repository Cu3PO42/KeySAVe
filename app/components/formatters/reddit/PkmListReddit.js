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
    return this.props.pokemon.first() ? (
      <Paper className={styles.paper}>
        Box | Slot | Species (Gender) | Nature | Ability | HP.ATK.DEF.SPATK.SPDEF.SPE | HP | ESV
        <br />
        |---|---|---|---|---|---|---|---|
        {this.props.pokemon.map(e =>
          <div>
            B{e.box + 1} | {Math.floor(e.slot / 6) + 1},{e.slot % 6 + 1} |&nbsp;
            {getSpecies(e.species, e.form, local)} ({genderString(e.gender)}) |&nbsp;
            {local.abilities[e.ability]} | {e.ivHp}.{e.ivAtk}.{e.ivDef}.{e.ivSpAtk}.{e.ivSpDef}.{e.ivSpe} |&nbsp;
            {local.abilities[e.hpType]} | {e.esv}
          </div>
        )}
      </Paper>
    ) : (
      <div></div>
    );
  }
}
