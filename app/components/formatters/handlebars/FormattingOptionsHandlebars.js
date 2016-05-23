import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ReloadIcon from 'material-ui/svg-icons/action/cached';
import CheckBox from 'material-ui/Checkbox';
import debounce from 'lodash.debounce';
import handlebars from 'handlebars';
import { createSelector } from 'reselect';
import styles from './FormattingOptionsHandlebars.module.scss';

export default class FormattingOptionsHandlebars extends React.Component {
  static propTypes = {
    updateFormat: React.PropTypes.func.isRequired,
    updateCurrentFormat: React.PropTypes.func.isRequired,
    format: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired,
    isDefault: React.PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = { ...props.format };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.index !== this.props.index) {
      this.props.updateFormat(this.props.index);
      this.flush.cancel();
      this.setState(nextProps.format);
    } else if (this.flushed) {
      this.setState(nextProps.format);
    }
  }

  updateBoxHeader = (e) => {
    this.setState({ boxHeader: e.target.value });
    this.flushed = false;
    this.flush();
  }

  updateFormat = (e) => {
    this.setState({ format: e.target.value });
    this.flushed = false;
    this.flush();
  }

  updateHeader = (e) => {
    this.setState({ header: e.target.value });
    this.flushed = false;
    this.flush();
  }

  updateSplitBoxes = (e, splitBoxes) => {
    this.props.updateCurrentFormat({ splitBoxes });
  }

  flush = debounce(() => {
    this.props.updateCurrentFormat(this.state);
    this.flushed = true;
  }, 1000);

  flushed = true;

  getFormatErrorText = createSelector(
    () => this.props.format.format,
    format => {
      try {
        handlebars.precompile(format);
        return null;
      } catch (e) {
        return <div className={styles.errorText}>Your template string is invalid.</div>;
      }
    }
  )

  getBoxHeaderErrorText = createSelector(
    () => this.props.format.boxHeader,
    boxHeader => {
      try {
        handlebars.precompile(boxHeader);
        return null;
      } catch (e) {
        return <div className={styles.errorText}>Your template string is invalid.</div>;
      }
    }
  )

  generateHeader = () => {
    this.updateTitle({ target: { value: handlebars.compile(this.props.format.format)({
      ball: 'Ball',
      ec: 'Encryption Constant',
      pid: 'PID',
      exp: 'Experience Points',
      evHp: 'HP EV',
      evAtk: 'ATK EV',
      evDef: 'DEF EV',
      evSpAtk: 'SPATK EV',
      evSpDef: 'SPDEF EV',
      evSpe: 'SPE EV',
      ivHp: 'HP IV',
      ivAtk: 'ATK IV',
      ivDef: 'DEF IV',
      ivSpAtk: 'SPATK IV',
      ivSpDef: 'SPDEF IV',
      ivSpe: 'SPE IV',
      contestStatCool: 'Contest Stat Cool',
      contestStatBeauty: 'Contest Stat Beauty',
      contestStatCute: 'Contest Stat Cute',
      contestStatSmart: 'Contest Stat Smart',
      contestStatTough: 'Contest Stat Tough',
      hpType: 'HP Type',
      nickname: 'Nickname',
      notOT: 'Not OT',
      ot: 'OT',
      pkrsStrain: 'Pokérus Strain',
      pkrsDuration: 'Pokérus Duration',
      levelMet: 'Met Level',
      otGender: 'OT Gender',
      isEgg: true,
      isNick: true,
      isShiny: true,
      isGhost: true,
      isFatefulEncounter: true,
      ability: 'Ability',
      abilityNum: 'Ability Number',
      nature: 'Nature',
      species: 'Species',
      heldItem: 'Held Item',
      tid: 'Trainer ID',
      sid: 'Secret ID',
      move1: 'Move 1',
      move2: 'Move 2',
      move3: 'Move 3',
      move4: 'Move 4',
      move1Pp: 'Move 1 PP',
      move2Pp: 'Move 2 PP',
      move3Pp: 'Move 3 PP',
      move4Pp: 'Move 4 PP',
      move1Ppu: 'Move 1 PP Up',
      move2Ppu: 'Move 2 PP Up',
      move3Ppu: 'Move 3 PP Up',
      move4Ppu: 'Move 4 PP Up',
      eggMove1: 'Eggmove 1',
      eggMove2: 'Eggmove 2',
      eggMove3: 'Eggmove 3',
      eggMove4: 'Eggmove 4',
      ribbonSet1: 'Ribbon Set 1',
      ribbonSet2: 'Ribbon Set 2',
      ribbonSet3: 'Ribbon Set 3',
      ribbonSet4: 'Ribbon Set 4',
      chk: 'Checksum',
      slot: 'Slot',
      form: 'Form',
      gender: 'Gender',
      metDate: 'Date Met',
      eggDate: 'Date Hatched'
    }, { helpers: {
      typeName(e) { return e; },
      moveName(e) { return e; },
      itemName(e) { return e; },
      ballName() { return 'Ball'; },
      genderString(e) { return e; },
      checkmark(e) { return e; },
      toJson() { return 'JSON'; },
      moment(e) { return e; },
      row() { return 'Row'; },
      column() { return 'Column'; },
      box() { return 'Box'; },
      speciesName() { return 'Species'; },
      formName() { return 'Form'; },
      natureName() { return 'Nature'; },
      abilityName() { return 'Ability'; },
      metLocationName() { return 'Met Location'; },
      eggLocationName() { return 'Egg Location'; },
      ballImage() { return 'Ball Image'; },
      level() { return 'Level'; },
      hp() { return 'HP'; },
      atk() { return 'ATK'; },
      def() { return 'DEF'; },
      spAtk() { return 'SPATK'; },
      spDef() { return 'SPDEF'; },
      spe() { return 'SPE'; },
      esv() { return 'ESV'; },
      tsv() { return 'TSV'; },
      language() { return 'Language'; },
      gameVersionString() { return 'Game Version'; },
      stepsToHatch() { return 'Steps To Hatch'; },
      pentagon() { return 'Pentagon'; },
      shinyMark() { return 'Shiny'; },
      markings() { return 'Markings'; },
      regionName() { return 'Region'; },
      countryName() { return 'Country'; },
      ribbons() { return ['Ribbons']; },
      hasHa() { return true; },
      characteristic() { return 'Characteristic'; },
      eval(expr) { return `'${expr}'`; },
    } }) } });
  }

  render() {
    return (
      <div>
        <div className={styles.flexRow}>
          <TextField
            value={this.state.header}
            onChange={this.updateHeader}
            className={styles.input}
            hintText="Header"
            fullWidth
            multiline
            disabled={this.props.isDefault}
          />
          <IconButton disabled={this.props.isDefault} onClick={this.generateHeader}><ReloadIcon /></IconButton>
        </div>
        <div>
          <TextField
            value={this.state.format}
            onChange={this.updateFormat}
            className={styles.input}
            hintText="Format string"
            errorText={this.getFormatErrorText()}
            fullWidth
            multiLine
            disabled={this.props.isDefault}
          />
        </div>
        <div>
          <TextField
            value={this.state.boxHeader}
            onChange={this.updateBoxHeader}
            className={styles.input}
            hintText="Box Header"
            errorText={this.getBoxHeaderErrorText()}
            fullWidth
            multiline
            disabled={this.props.isDefault}
          />
        </div>
        <div>
          <CheckBox
            checked={this.props.format.splitBoxes}
            onCheck={this.updateSplitBoxes}
            label="Split boxes"
            disabled={this.props.isDefault}
          />
        </div>
      </div>
    );
  }
}
