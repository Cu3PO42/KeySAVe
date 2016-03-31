import React from 'react';
import Paper from 'material-ui/lib/paper';
import { Localization } from 'keysavcore';
import backgroundColors from './background-colors.json';
import styles from './PkmListPretty.module.scss';

const ivNames = ['Hp', 'Atk', 'Def', 'SpAtk', 'SpDef', 'Spe'];
const genderStyles = [styles.genderMale, styles.genderFemale, styles.genderNeutral];

function getIvClass(iv) {
  if (31 - iv <= 1) {
    return styles.ivGood;
  }

  if (iv <= 1) {
    return styles.ivBad;
  }

  return '';
}

function pad2(n) {
  return ('00' + n).slice(-2);
}
function pad3(n) {
  return ('000' + n).slice(-3);
}

export default class PkmListPretty extends React.Component {
  static propTypes = {
    pokemon: React.PropTypes.object,
    language: React.PropTypes.string,
    format: React.PropTypes.object
  };

  render() {
    const local = Localization[this.props.language];
    return (
      <div>
        {this.props.pokemon.map(pkm =>
          <Paper key={pkm.box * 30 + pkm.slot} className={styles.paper}>
            <div className={styles.sprite}><img
              src={`resources/sprites/${pkm.species + (pkm.form === 0 ? '' : '-' + pkm.form)}.png`}
              style={{ backgroundColor: backgroundColors[pkm.species + (pkm.form === 0 ? '' : '-' + pkm.form)] }}
            /></div>
            <div className={styles.infoSide}>
              <div className={styles.nameLine}>
                <span className={styles.box}>Box {pad2(pkm.box + 1)} - {Math.floor(pkm.slot / 6) + 1},{pkm.slot % 6 + 1}</span><span className={styles.dexNo}><span className={styles.dexHash}>#</span>{pad3(pkm.species)}</span> <span className={genderStyles[pkm.gender]}>{local.species[pkm.species]}{pkm.form === 0 ? '' : ` (${local.forms[pkm.form]})`}</span>
              </div>
              <div className={styles.ivLine}>
                {ivNames.map((iv, i) =>
                  <div className={`${styles.ivBox} ${getIvClass(pkm['iv' + iv])}`} key={i}>
                    <span className={styles.ivName}>{iv}</span>
                    <span className={styles.ivValue}>{pkm['iv' + iv]}</span>
                  </div>
                )}
              </div>
            </div>
          </Paper>
        )}
      </div>
    );
  }
}
