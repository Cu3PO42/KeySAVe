import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import handlebars from 'handlebars';
import dashbars from 'dashbars';
import helperMoment from 'handlebars-helper-moment';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { knownHelpersBox, knownHelpersPokemon } from './knownHelpers';
import makeCached from '../../../utils/makeCachedFunction';
import loadData from '../../../containers/DataLoader';
import styles from './PkmListHandlebars.module.scss';

dashbars.help(handlebars);
handlebars.registerHelper(helperMoment);

const emptyString = '';

class PkmListHandlebars extends PureComponent {
  static propTypes = {
    pokemon: PropTypes.object,
    filterFunction: PropTypes.func.isRequired,
    language: PropTypes.string,
    format: PropTypes.object,
  };

  constructor(...args) {
    super(...args);
    const self = this;
    const { local, calc } = this.props;
    this.handlebarsHelpers = {
      row() {
        return Math.floor(this.slot / 6) + 1;
      },
      column() {
        return this.slot % 6 + 1;
      },
      box() {
        return this.box + 1;
      },
      level() {
        return calc.level(this);
      },
      hp() {
        return calc.hp(this);
      },
      atk() {
        return calc.atk(this);
      },
      def() {
        return calc.def(this);
      },
      spAtk() {
        return calc.spAtk(this);
      },
      spDef() {
        return calc.spDef(this);
      },
      spe() {
        return calc.spe(this);
      },
      speciesName() {
        return local.species[this.species];
      },
      hasAlternateForm() {
        const forms = local.forms[this.species];
        return !!(forms && forms[this.form]);
      },
      formName() {
        const local = local;
        const forms = this.version === 6 ? local.forms6 : local.forms7;
        return forms[this.species] ? forms[this.species][this.form] : '';
      },
      natureName() {
        return local.natures[this.nature];
      },
      abilityName() {
        return local.abilities[this.ability];
      },
      typeName(typeId) {
        return local.types[typeId];
      },
      moveName(moveId) {
        return moveId ? local.moves[moveId] : '';
      },
      itemName(itemId) {
        return itemId ? local.items[itemId] : '';
      },
      ballName() {
        return local.getBallName(this.ball);
      },
      metLocationName() {
        return local.getLocation(this);
      },
      eggLocationName() {
        return local.getEggLocation(this);
      },
      ballImage() {
        return (
          '[](/' +
          local
            .getBallName(this.ball)
            .replace(' ', '')
            .replace('é', 'e')
            .toLowerCase() +
          ')'
        );
      },
      esv() {
        return ('0000' + this.esv).slice(-4);
      },
      tsv() {
        return ('0000' + this.tsv).slice(-4);
      },
      tid() {
        return this.gameVersion <= 27
          ? ('00000' + this.tid).slice(-5)
          : ('000000' + this.tid7).slice(-6);
      },
      sid() {
        return ('00000' + this.sid).slice(-5);
      },
      tid7() {
        return this.gameVersion <= 27 ? 'N/A' : ('000000' + this.tid7).slice(-6);
      },
      tid6() {
        return ('00000' + this.tid).slice(-5);
      },
      language() {
        return local.languageTags[this.otLang];
      },
      genderString(gender) {
        switch (0 + gender) {
          case 0:
            return '♂';
          case 1:
            return '♀';
          case 2:
          default:
            return '-';
        }
      },
      gameVersionString() {
        return local.games[this.gameVersion];
      },
      stepsToHatch() {
        return this.isEgg * (this.otFriendship - 1) * 256;
      },
      hasHa() {
        return this.abilityNum === 4;
      },
      checkmark(condition) {
        return condition ? '✓' : '✗';
      },
      pentagon() {
        return this.gameVersion >= 24 && this.gameVersion <= 27 ? '⬟' : '';
      },
      cross() {
        return this.gameVersion > 27 ? '+' : '';
      },
      shinyMark() {
        return this.isShiny ? '★' : '';
      },
      markings() {
        if (this.version === 6) {
          return (
            (this.markings & 0x01 ? '●' : '◯') +
            (this.markings & 0x02 ? '▲' : '△') +
            (this.markings & 0x04 ? '■' : '□') +
            (this.markings & 0x08 ? '♥' : '♡') +
            (this.markings & 0x10 ? '★' : '☆') +
            (this.markings & 0x20 ? '◆' : '◇')
          );
        }

        const markers = [['●', '◯'], ['▲', '△'], ['■', '□'], ['♥', '♡'], ['★', '☆'], ['◆', '◇']];
        const pink = '#e546b9';
        const blue = '#549dc7';
        const colors = [blue, pink, pink];
        let res = '';
        for (let i = 0; i < markers.length; ++i) {
          const markVal = (this.markings >>> (i << 1)) & 3;
          if (markVal === 0) {
            res += markers[i][1];
          } else {
            const color = colors[markVal - 1];
            res += `<span style="color: ${color};">${markers[i][0]}</span>`;
          }
        }
        return new handlebars.SafeString(res);
      },
      regionName() {
        return local.regions[this.gameVersion];
      },
      countryName() {
        return local.countries[this.countryID];
      },
      ribbons() {
        return local.getRibbons(this);
      },
      characteristic() {
        return local.getCharacteristic(this);
      },
      esacpe(str) {
        return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      },
      toJson(e) {
        return new handlebars.SafeString(JSON.stringify(e));
      },
      eval(expr) {
        /* eslint-disable no-unused-vars */
        const pkm = this;
        const hbs = handlebars;
        /* eslint-enable no-unused-vars */
        /* eslint-disable no-eval */
        return new handlebars.SafeString(eval(expr));
        /* eslint-enable no-eval */
      },
    };
  }

  getPlainText() {
    const node = ReactDOM.findDOMNode(this);
    if (this.props.format.splitBoxes) {
      return Array.from(node.childNodes)
        .map(child => child.firstChild.innerText + '\n' + child.lastChild.innerText)
        .join('\n');
    }

    return node.innerText;
  }

  getFormatTemplate = createSelector(
    () => this.props.format.format || emptyString,
    t => {
      const templ = handlebars.compile(t, {
        knownHelpers: knownHelpersPokemon,
        knownHelpersOnly: true,
      });
      return makeCached(pkm => templ(pkm, { helpers: this.handlebarsHelpers }));
    }
  );

  getBoxHeaderTemplate = createSelector(
    () => this.props.format.boxHeader || emptyString,
    t => handlebars.compile(t, { knownHelpers: knownHelpersBox, knownHelpersOnly: true })
  );

  getPokemonGroupedByBox = createSelector(
    () => this.props.pokemon,
    () => this.props.pokemon.groupBy(e => e.box)
  );

  getShowBoxMap = createSelector(
    this.getPokemonGroupedByBox,
    () => this.props.filterFunction,
    (pokemon, filter) => pokemon.map(pkm => pkm.some(filter))
  );

  renderBox(pkm) {
    const template = this.getFormatTemplate();
    return (
      <Paper className={styles.paper}>
        <div className={styles.box}>
          <div dangerouslySetInnerHTML={{ __html: this.props.format.header }} />
          {pkm
            .map(e => (
              <div
                key={e.box * 30 + e.slot}
                dangerouslySetInnerHTML={{ __html: template(e) }}
                style={{ display: this.props.filterFunction(e) ? 'block' : 'none' }}
              />
            ))
            .cacheResult()}
        </div>
      </Paper>
    );
  }

  render() {
    const first = this.props.pokemon.first();
    try {
      if (!first) {
        return <div />;
      }

      this.getFormatTemplate()(first); // Do this to catch errors early on

      if (this.props.format.splitBoxes) {
        const grouped = this.getPokemonGroupedByBox();
        const boxHeaderTemplate = this.getBoxHeaderTemplate();
        const showBoxMap = this.getShowBoxMap();

        return (
          <div>
            {grouped
              .map((pkm, box) => (
                <div key={box} style={{ display: showBoxMap.get(box) ? 'block' : 'none' }}>
                  <div dangerouslySetInnerHTML={{ __html: boxHeaderTemplate({ box: box + 1 }) }} />
                  {this.renderBox(pkm, box)}
                </div>
              ))
              .valueSeq()
              .cacheResult()}
          </div>
        );
      }

      return this.renderBox(this.props.pokemon);
    } catch (e) {
      console.log(e);
      return (
        <Paper className={styles.paper}>Template error! Please check your format string!</Paper>
      );
    }
  }
}

export default loadData({ loadLocal: true, loadCalc: true }, PkmListHandlebars);
