import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/lib/paper';
import handlebars from 'handlebars';
import dashbars from 'dashbars';
import helperMoment from 'handlebars-helper-moment';
import pureRender from 'pure-render-decorator';
import { createSelector } from 'reselect';
import { Localization, Calculator as StatCalculator } from 'keysavcore';
import styles from './PkmListHandlebars.module.scss';

dashbars.help(handlebars);
handlebars.registerHelper(helperMoment());

@pureRender
class PkmListHandlebars extends Component {
  static propTypes = {
    pokemon: React.PropTypes.object,
    language: React.PropTypes.string,
    format: React.PropTypes.object
  };

  constructor(...args) {
    super(...args);
    const self = this;
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
        return StatCalculator.level(this);
      },
      hp() {
        return StatCalculator.hp(this);
      },
      atk() {
        return StatCalculator.atk(this);
      },
      def() {
        return StatCalculator.def(this);
      },
      spAtk() {
        return StatCalculator.spAtk(this);
      },
      spDef() {
        return StatCalculator.spDef(this);
      },
      spe() {
        return StatCalculator.spe(this);
      },
      speciesName() {
        return Localization[self.props.language].species[this.species];
      },
      hasAlternateForm() {
        const forms = Localization[self.props.language].forms[this.species];
        return !!(forms && forms[this.form]);
      },
      formName() {
        return Localization[self.props.language].forms[this.species] ? Localization[self.props.language].forms[this.species][this.form] : '';
      },
      natureName() {
        return Localization[self.props.language].natures[this.nature];
      },
      abilityName() {
        return Localization[self.props.language].abilities[this.ability];
      },
      typeName(typeId) {
        return Localization[self.props.language].types[typeId];
      },
      moveName(moveId) {
        return moveId ? Localization[self.props.language].moves[moveId] : '';
      },
      itemName(itemId) {
        return itemId ? Localization[self.props.language].items[itemId] : '';
      },
      ballName() {
        return Localization[self.props.language].getBallName(this.ball);
      },
      metLocationName() {
        return Localization[self.props.language].getLocation(this);
      },
      eggLocationName() {
        return Localization[self.props.language].getEggLocation(this);
      },
      ballImage() {
        return '[](/' + Localization[self.props.language].items[this.ball].replace(' ', '').replace('é', 'e').toLowerCase() + ')';
      },
      esv() {
        return ('0000' + this.esv).slice(-4);
      },
      tsv() {
        return ('0000' + this.tsv).slice(-4);
      },
      language() {
        return Localization[self.props.language].languageTags[this.otLang];
      },
      genderString(gender) {
        switch (gender) {
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
        return Localization[self.props.language].games[this.gameVersion];
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
      shinyMark() {
        return this.isShiny ? '★' : '';
      },
      markings() {
        return ((this.markings & 0x01 ? '●' : '◯')
              + (this.markings & 0x02 ? '▲' : '△')
              + (this.markings & 0x04 ? '■' : '□')
              + (this.markings & 0x08 ? '♥' : '♡')
              + (this.markings & 0x10 ? '★' : '☆')
              + (this.markings & 0x20 ? '◆' : '◇'));
      },
      regionName() {
        return Localization[self.props.language].regions[this.gameVersion];
      },
      countryName() {
        return Localization[self.props.language].countries[this.countryID];
      },
      ribbons() {
        return Localization[self.props.language].getRibbons(this);
      },
      esacpe(str) {
        return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      },
      toJson(e) {
        return new handlebars.SafeString(JSON.stringify(e));
      },
      eval(expr) {
        /* eslint-disable no-unused-vars */
        const local = Localization[self.props.language];
        const pkm = this;
        /* eslint-enable no-unused-vars */
        /* eslint-disable no-eval */
        return eval(expr);
        /* eslint-enable no-eval */
      }
    };
  }

  getPlainText() {
    const node = ReactDOM.findDOMNode(this);
    if (this.props.format.splitBoxes) {
      return Array.from(node.childNodes).map(child =>
        child.firstChild.innerText + '\n' + child.lastChild.innerText
      ).join('\n');
    }

    return node.innerText;
  }

  getFormatTemplate = createSelector(
    () => this.props.format.format || '',
    handlebars.compile
  );

  getBoxHeaderTemplate = createSelector(
    () => this.props.format.boxHeader || '',
    handlebars.compile
  );

  renderBox(pkm) {
    const template = this.getFormatTemplate();

    return (
      <Paper className={styles.paper}>
        <div className={styles.box}>
          {this.props.format.header}
          {pkm.map(e => <div key={e.box * 30 + e.slot} dangerouslySetInnerHTML={{ __html: template(e, { helpers: this.handlebarsHelpers }) }}></div>)}
        </div>
      </Paper>
    );
  }

  render() {
    try {
      if (!this.props.pokemon.first()) {
        return <div></div>;
      }

      if (this.props.format.splitBoxes) {
        const grouped = this.props.pokemon.groupBy(e => e.box);
        const boxHeaderTemplate = this.getBoxHeaderTemplate();

        return (
          <div>
            {grouped.map((pkm, box) => (
              <div key={box}>
                <div dangerouslySetInnerHTML={{ __html: boxHeaderTemplate({ box: box + 1 }) }}></div>
                {this.renderBox(pkm, box)}
              </div>
            )).valueSeq()}
          </div>
        );
      }

      return this.renderBox(this.props.pokemon);
    } catch (e) {
      return (
        <Paper className={styles.paper}>
          Template error! Please check your format string!
        </Paper>
      );
    }
  }
}

export default PkmListHandlebars;
