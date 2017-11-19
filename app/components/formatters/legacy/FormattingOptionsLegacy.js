import PropTypes from 'prop-types';
import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ReloadIcon from 'material-ui/svg-icons/action/cached';
import CheckBox from 'material-ui/Checkbox';
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup';
import RadioButton from 'material-ui/RadioButton';
import debounce from 'lodash.debounce';
import styles from './FormattingOptionsLegacy.module.scss';

const replaceDatabase = {
  0: 'Box',
  1: 'Slot(Row, Column)',
  2: 'Species',
  3: 'Gender',
  4: 'Nature',
  5: 'Ability',
  6: 'HP IV',
  7: 'Attack IV',
  8: 'Defense IV',
  9: 'Sp. Attack IV',
  10: 'Sp. Defense IV',
  11: 'Speed IV',
  12: 'Hidden Power Type',
  13: 'ESV',
  14: 'TSV',
  15: 'Nickname',
  16: 'OT Name',
  17: 'Ball',
  18: 'TID',
  19: 'SID',
  20: 'HP EV',
  21: 'Attack EV',
  22: 'Defense EV',
  23: 'Sp. Attack EV',
  24: 'Sp. Defense EV',
  25: 'Speed EV',
  26: 'Move 1',
  27: 'Move 2',
  28: 'Move 3',
  29: 'Move 4',
  30: 'Egg/Relearn Move 1',
  31: 'Egg/Relearn Move 2',
  32: 'Egg/Relearn Move 3',
  33: 'Egg/Relearn Move 4',
  34: 'Shinyness',
  35: 'Is Egg',
  36: 'Level',
  37: 'Region',
  38: 'Country',
  39: 'Held Item',
  40: 'Language',
  41: 'Game',
  42: 'Slot in Box',
  43: 'PID',
  44: 'Gen. 6 Mark',
  45: 'Dex/Species Number',
  46: 'Form',
  47: 'Is HP IV Perfect',
  48: 'Is Attack IV Perfect',
  49: 'Is Defense IV Perfect',
  50: 'Is Sp. Attack IV Perfect',
  51: 'Is Sp. Defense IV Perfect',
  52: 'Is Speed IV Perfect',
  53: 'Perfect IV Count',
  54: 'IV Sum',
  55: 'EV Sum',
  56: 'Egg Received Date (YYYY-MM-DD)',
  57: 'Met/Hatched Date (YYYY-MM-DD)',
  58: 'Experience',
  59: 'Dump Count Number',
  60: 'Infected with Pokérus',
  61: 'Cured from Pokérus',
  62: 'OT Gender',
  63: 'Met Level',
  64: 'OT Friendship',
  65: 'OT Affection',
  66: 'Minimum Steps to Hatch',
  67: 'Ball Image (for /r/SVExchange)',
  68: 'Has Hiddem Ability'
};

export default class FormattingOptionsLegacy extends React.Component {
  static propTypes = {
    updateFormat: PropTypes.func.isRequired,
    updateCurrentFormat: PropTypes.func.isRequired,
    format: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    isDefault: PropTypes.bool
  }

  state = {
    ...this.props.format
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.index !== this.props.index) {
      this.props.updateFormat(this.props.index);
      this.flush.cancel();
      this.setState(nextProps.format);
    } else if (this.flushed) {
      this.setState(nextProps.format);
    }
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

  updateAlwaysShowEsv = (e, alwaysShowEsv) => {
    this.props.updateCurrentFormat({ alwaysShowEsv });
  }

  updateGhosts = (e, ghosts) => {
    this.props.updateCurrentFormat({ ghosts });
  }

  flush = debounce(() => {
    this.props.updateCurrentFormat(this.state);
    this.flushed = true;
  }, 1000);

  flushed = true;

  generateHeader = () => {
    const header = this.state.format.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/{(\d+)}/g, (string, count) => replaceDatabase[count]);
    this.updateHeader({ target: { value: header } });
  }

  render() {
    return (
      <div>
        <div className={styles.flexRow}>
          <TextField
            value={this.state.header}
            onChange={this.updateTitle}
            className={styles.input}
            hintText="Header"
            fullWidth
            multiLine
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
            fullWidth
            multiLine
            disabled={this.props.isDefault}
          />
        </div>
        <div className={styles.flexRow}>
          <div className={styles.column}>
            <h4>Miscellaneous</h4>
            <CheckBox
              label="Split Boxes"
              checked={this.props.format.splitBoxes}
              onCheck={this.updateSplitBoxes}
              disabled={this.props.isDefault}
            />
            <CheckBox
              label="Show ESV for hatched Pokémon"
              checked={this.props.format.alwaysShowEsv}
              onCheck={this.updateAlwaysShowEsv}
              disabled={this.props.isDefault}
            />
          </div>
          <div className={styles.column}>
            <h4>Ghost data</h4>
            <RadioButtonGroup
              name="Ghosts"
              valueSelected={this.props.format.ghosts}
              onChange={this.updateGhosts}
              disabled={this.props.isDefault}
            >
              <RadioButton value="show" label="Show" />
              <RadioButton value="mark" label="Mark with ~ (recommended)" />
              <RadioButton value="hide" label="Hide" />
            </RadioButtonGroup>
          </div>
        </div>
      </div>
    );
  }
}
