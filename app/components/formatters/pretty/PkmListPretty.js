import React from 'react';
import Paper from 'material-ui/Paper';
import backgroundColors from './background-colors.json';
import PropTypes from 'prop-types';
import pureRender from 'pure-render-decorator';
import { createSelector } from 'reselect';
import loadData from '../../../containers/DataLoader';
import styles from './PkmListPretty.module.scss';

const ivNames = ['Hp', 'Atk', 'Def', 'SpAtk', 'SpDef', 'Spe'];
const genderStyles = [styles.genderMale, styles.genderFemale, styles.genderNeutral];

function getIvClass(pkm, iv) {
  const val = pkm['iv' + iv];
  if (iv === 'Spe' && pkm.nature % 5 === 2) {
    if (31 - val <= 1) {
      return styles.ivBad;
    }

    if (val <= 1) {
      return styles.ivGood;
    }
  }
  if (31 - val <= 1) {
    return styles.ivGood;
  }

  if (val <= 1) {
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
function pad4(n) {
  return ('0000' + n).slice(-4);
}

const getIsShiny = createSelector(
  state => state.filter.eggsHaveMySv,
  state => (state.filter.svs.match(/\b\d{1,4}\b/g) || []).map(sv => parseInt(sv, 10)),
  (eggsHaveMySv, svs) => pkm => pkm.isEgg && (eggsHaveMySv && pkm.esv === pkm.tsv || svs.includes(pkm.esv)) || !pkm.isEgg && pkm.esv === pkm.tsv
);

function getSprite(pkm, state) {
  let sprite = ('' + pkm.species) + '-' + pkm.form + (getIsShiny(state)(pkm) ? '-s' : '');
  if (backgroundColors[sprite]) {
    return sprite;
  }
  sprite = '' + pkm.species + '-0' + (pkm.tsv === pkm.esv ? '-s' : '');
  if (backgroundColors[sprite]) {
    return sprite;
  }
  return '';
}

function getSpecies(pkm, local) {
  const forms = pkm.version === 6 ? local.forms6 : local.forms7;
  if (forms[pkm.species] && forms[pkm.species][pkm.form]) {
    return local.species[pkm.species] + ' (' + forms[pkm.species][pkm.form] + ')';
  }
  return local.species[pkm.species];
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

@pureRender
class PkmData extends React.Component {
  static propTypes = {
    pkm: PropTypes.object,
    language: PropTypes.string,
    local: PropTypes.object,
  };

  render() {
    const { pkm, local } = this.props;
    return (
      <div className={styles.infoSide}>
        <div className={styles.nameLine}>
          <div>
            <div className={styles.box}><span className={styles.boxName}>Box </span>{pad2(pkm.box + 1)} - {Math.floor(pkm.slot / 6) + 1},{pkm.slot % 6 + 1}</div>
            <div>
              <span className={styles.dexNo}><span className={styles.dexHash}>#</span>{pad3(pkm.species)}</span>&nbsp;
              <span className={genderStyles[pkm.gender]}>{getSpecies(pkm, local)}</span>
            </div>
          </div>
          <div className={styles.nameColumn}>
            <div>
              <div>OT</div><div className={genderStyles[pkm.otGender]}>{pkm.ot}</div>
            </div>
            <div>
              <div>Nickname</div><div>{pkm.nickname}</div>
            </div>
          </div>
          <div className={styles.nameColumn}>
            <div>
              <div>Nature</div><div>{local.natures[pkm.nature]}</div>
            </div>
            <div>
              <div>Ability</div><div>{local.abilities[pkm.ability]}</div>
            </div>
          </div>

          <span className={styles.langTag}>{local.languageTags[pkm.otLang]}</span>
        </div>
        <div className={styles.ivLine}>
          {ivNames.map((iv, i) =>
            <div className={`${styles.ivBox} ${getIvClass(pkm, iv)}`} key={i}>
              <span className={styles.ivName}>{iv}</span>
              <span className={styles.ivValue}>{pkm['iv' + iv]}</span>
            </div>
          )}
          <div className={styles.esvBox}>
            <span className={styles.esvName}>ESV</span>
            <span className={styles.esvValue}>{pad4(pkm.esv)}</span>
          </div>
        </div>
      </div>
    );
  }
}

@pureRender
class Pkm extends React.Component {
  static propTypes = {
    pkm: PropTypes.object,
    filterFunction: PropTypes.func.isRequired,
    language: PropTypes.string,
    format: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object
  };

  render() {
    const { pkm, local } = this.props;
    const sprite = getSprite(pkm, this.context.store.getState());
    return (
      <Paper
        className={`${styles.paper} ${pkm.isGhost && this.props.format.ghosts === 'mark' ? styles.ghost : ''}`}
        style={{ display: this.props.filterFunction(pkm) && (this.props.format.ghosts !== 'hide' || !pkm.isGhost) ? undefined : 'none' }}
      >
        <div
          className={styles.sprite}
          style={{ backgroundColor: backgroundColors[sprite] }}
        ><div
          style={sprite === '' ? { width: '80px', height: '80px' } : {
            width: '80px',
            height: '80px',
            backgroundImage: `url(sprites/${sprite}.png)`,
            backgroundSize: '80px 80px' 
          }}
        /></div>
        <PkmData pkm={pkm} language={this.props.language} local={local} />
      </Paper>
    );
  }
}

@pureRender
class PkmListPretty extends React.Component {
  static propTypes = {
    pokemon: PropTypes.object,
    filterFunction: PropTypes.func.isRequired,
    language: PropTypes.string,
    format: PropTypes.object,
    local: PropTypes.object
  };

  getPlainText() {
    const local = Localization[this.props.language];
    const header = 'Box - Slot - Species (Gender) - Nature - Ability - HP.ATK.DEF.SPA.SPD.SPE - Hidden Power [ESV]';
    const hideGhosts = this.props.format.ghosts === 'hide';
    return header + this.props.pokemon.filter(e => this.props.filterFunction(e) && (!hideGhosts || !e.isGhost)).map(e =>
      `${e.isGhost ? '~' : ''}` +
      `Box ${pad2(e.box + 1)} - ${Math.floor(e.slot / 6) + 1},${e.slot % 6 + 1} - ` +
      `${getSpecies(e, local)} (${genderString(e.gender)}) - ` +
      `${local.natures[e.nature]} - ${local.abilities[e.ability]} - ` +
      ['Hp', 'Atk', 'Def', 'SpAtk', 'SpDef', 'Spe'].map(iv => e['iv' + iv]).join('.') +
      ` - ${local.types[e.hpType]} [${('0000' + e.esv).slice(-4)}]`
    ).join('\n');
  }

  /*
  Include:
  - Ball?
  - HP Type
  */
  render() {
    return (
      <div>
        {this.props.pokemon.map(pkm =>
          <Pkm
            key={pkm.box * 30 + pkm.slot}
            pkm={pkm}
            language={this.props.language}
            filterFunction={this.props.filterFunction}
            format={this.props.format}
            local={this.props.local}
          />
        ).cacheResult()}
      </div>
    );
  }
}

export default loadData({ loadLocal: true }, PkmListPretty);