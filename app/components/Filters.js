import PropTypes from 'prop-types';
import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import ExpandLessIcon from 'material-ui/svg-icons/navigation/expand-less';
import CheckBox from 'material-ui/Checkbox';
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup';
import RadioButton from 'material-ui/RadioButton';
import Select from './MaterialSelect';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { createSelector } from 'reselect';
import { Localization } from 'keysavcore';
import debounce from 'lodash.debounce';
import styles from './Filters.module.scss';

export default class Filters extends React.Component {
  static propTypes = {
    enabled: PropTypes.bool.isRequired,
    language: PropTypes.string.isRequired,
    eggsOnly: PropTypes.bool.isRequired,
    gender: PropTypes.string.isRequired,
    species: PropTypes.array.isRequired,
    hpTypes: PropTypes.array.isRequired,
    natures: PropTypes.array.isRequired,
    abilities: PropTypes.array.isRequired,
    haOnly: PropTypes.bool.isRequired,
    numPerfectIvs: PropTypes.number.isRequired,
    ivs: PropTypes.object.isRequired,
    trickroom: PropTypes.bool.isRequired,
    specialAttacker: PropTypes.bool.isRequired,
    shiniesOnly: PropTypes.bool.isRequired,
    shinyOverride: PropTypes.bool.isRequired,
    eggsHaveMySv: PropTypes.bool.isRequired,
    svs: PropTypes.string.isRequired,
    customFilter: PropTypes.func,
    customFilterRaw: PropTypes.string.isRequired,

    toggleFilters: PropTypes.func.isRequired,
    setEggsOnly: PropTypes.func.isRequired,
    setGenderFilter: PropTypes.func.isRequired,
    setSpeciesFilter: PropTypes.func.isRequired,
    setHpFilter: PropTypes.func.isRequired,
    setNatureFilter: PropTypes.func.isRequired,
    setAbilityFilter: PropTypes.func.isRequired,
    setHaOnly: PropTypes.func.isRequired,
    setNumPerfectIvs: PropTypes.func.isRequired,
    setAllPerfectIvs: PropTypes.func.isRequired,
    setPerfectIv: PropTypes.func.isRequired,
    setTrickRoom: PropTypes.func.isRequired,
    setSpecialAttacker: PropTypes.func.isRequired,
    setShiniesOnly: PropTypes.func.isRequired,
    setShinyOverride: PropTypes.func.isRequired,
    setEggsHaveMySv: PropTypes.func.isRequired,
    setEggsHaveSvs: PropTypes.func.isRequired,
    setCustomFilter: PropTypes.func.isRequired
  };

  state = {
    customFilterRaw: this.props.customFilterRaw
  }

  setEggsOnly = (e, v) => this.props.setEggsOnly(v)

  setGenderFilter = (e, v) => this.props.setGenderFilter(v)

  setHaOnly = (e, v) => this.props.setHaOnly(v)

  setNumPerfectIvs = (e, i, v) => this.props.setNumPerfectIvs(v - 1)
  setAllPerfectIvs = (e, v) => this.props.setAllPerfectIvs(v)

  toggleHp = (e, v) => this.props.setPerfectIv('hp', v);
  toggleAtk = (e, v) => this.props.setPerfectIv('atk', v);
  toggleDef = (e, v) => this.props.setPerfectIv('def', v);
  toggleSpAtk = (e, v) => this.props.setPerfectIv('spAtk', v);
  toggleSpDef = (e, v) => this.props.setPerfectIv('spDef', v);
  toggleSpe = (e, v) => this.props.setPerfectIv('spe', v);

  setTrickRoom = (e, v) => this.props.setTrickRoom(v)
  setSpecialAttacker = (e, v) => this.props.setSpecialAttacker(v)

  setShiniesOnly = (e, v) => this.props.setShiniesOnly(v)
  setShinyOverride = (e, v) => this.props.setShinyOverride(v)

  setEggsHaveMySv = (e, v) => this.props.setEggsHaveMySv(v)
  setEggsHaveSvs = e => this.props.setEggsHaveSvs(e.target.value)

  setCustomFilterRaw = e => {
    this.setState({ customFilterRaw: e.target.value });
    this.flushCustomFilter();
  }

  flushCustomFilter = debounce(() => this.props.setCustomFilter(this.state.customFilterRaw), 1000);

  getSpeciesOptions = createSelector(
    () => this.props.language,
    lang => Localization[lang].species.map((e, i) => ({ value: i, label: e })).slice(1)
  )

  getHpOptions = createSelector(
    () => this.props.language,
    lang => Localization[lang].types.map((e, i) => ({ value: i, label: e })).slice(1)
  )

  getNatureOptions = createSelector(
    () => this.props.language,
    lang => Localization[lang].natures.map((e, i) => ({ value: i, label: e }))
  )

  getAbilityOptions = createSelector(
    () => this.props.language,
    lang => Localization[lang].abilities.map((e, i) => ({ value: i, label: e })).slice(1)
  )

  render() {
    const {
      enabled,
      eggsOnly,
      gender,
      species,
      hpTypes,
      natures,
      abilities,
      haOnly,
      numPerfectIvs,
      ivs,
      trickroom,
      specialAttacker,
      shiniesOnly,
      shinyOverride,
      eggsHaveMySv,
      svs,
      customFilter,

      toggleFilters,
      setSpeciesFilter,
      setHpFilter,
      setNatureFilter,
      setAbilityFilter,
    } = this.props;

    return (
      <div className={styles.container}>
        <RaisedButton
          label={enabled ? 'Disable Filters' : 'Enable Filters'}
          labelPosition="before"
          onClick={toggleFilters}
          icon={enabled ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        />
        <div style={enabled ? {} : { display: 'none' }}>
          <div className={styles.paperWrapper}>
            <Paper className={styles.paper}>
              <CheckBox
                label="Eggs only"
                checked={eggsOnly}
                onCheck={this.setEggsOnly}
              />
              <RadioButtonGroup
                name="Gender"
                valueSelected={gender}
                onChange={this.setGenderFilter}
                className={styles.radioHorizontal}
              >
                <RadioButton label="♂" value="0" />
                <RadioButton label="♀" value="1" />
                <RadioButton label="Genderless" value="2" />
                <RadioButton label="Any" value="3" />
              </RadioButtonGroup>
              <Select
                name="species"
                placeholder="Species"
                value={species}
                onChange={setSpeciesFilter}
                options={this.getSpeciesOptions()}
                multi
              />
              <Select
                name="hp-types"
                placeholder="HP Types"
                value={hpTypes}
                onChange={setHpFilter}
                options={this.getHpOptions()}
                multi
              />
              <Select
                name="natures"
                placeholder="Natures"
                value={natures}
                onChange={setNatureFilter}
                options={this.getNatureOptions()}
                multi
              />
              <Select
                name="abilities"
                placeholder="Abilities"
                value={abilities}
                onChange={setAbilityFilter}
                options={this.getAbilityOptions()}
                multi
              />
              <CheckBox label="Has Hidden Ability" checked={haOnly} onCheck={this.setHaOnly} />
              <SelectField
                floatingLabelText="No. of perfect IVs"
                value={numPerfectIvs + 1}
                onChange={this.setNumPerfectIvs}
              >
                <MenuItem primaryText="0" value={1} />
                <MenuItem primaryText="1" value={2} />
                <MenuItem primaryText="2" value={3} />
                <MenuItem primaryText="3" value={4} />
                <MenuItem primaryText="4" value={5} />
                <MenuItem primaryText="5" value={6} />
                <MenuItem primaryText="6" value={7} />
              </SelectField>
              <p>These perfect IVs:</p>
              <div className={styles.checkBoxCols}>
                <div>
                  <CheckBox label="All" checked={ivs.hp && ivs.atk && ivs.def && ivs.spAtk && ivs.spDef && ivs.spe} onCheck={this.setAllPerfectIvs} />
                  <CheckBox label="Trickroom" checked={trickroom} onCheck={this.setTrickRoom} />
                  <CheckBox label="Special Attacker" checked={specialAttacker} onCheck={this.setSpecialAttacker} />
                </div>
                <div>
                  <CheckBox label="HP" checked={ivs.hp} onCheck={this.toggleHp} />
                  <CheckBox label="Atk" checked={ivs.atk} onCheck={this.toggleAtk} />
                  <CheckBox label="Def" checked={ivs.def} onCheck={this.toggleDef} />
                </div>
                <div>
                  <CheckBox label="SpAtk" checked={ivs.spAtk} onCheck={this.toggleSpAtk} />
                  <CheckBox label="SpDef" checked={ivs.spDef} onCheck={this.toggleSpDef} />
                  <CheckBox label="Spe" checked={ivs.spe} onCheck={this.toggleSpe} />
                </div>
              </div>
              <p>Shinyness:</p>
              <CheckBox label="Is Shiny" checked={shiniesOnly} onCheck={this.setShiniesOnly} />
              <CheckBox label="Shiny override" checked={shinyOverride} onCheck={this.setShinyOverride} />
              <p>Eggs have...</p>
              <CheckBox label="My SV" checked={eggsHaveMySv} onCheck={this.setEggsHaveMySv} />
              <TextField
                floatingLabelText="any of these SVs"
                value={svs}
                onChange={this.setEggsHaveSvs}
              />
              <TextField
                floatingLabelText="Custom Filter"
                value={this.state.customFilterRaw}
                onChange={this.setCustomFilterRaw}
                errorText={customFilter === null ? 'This is not a valid JS expression.' : undefined}
                fullWidth
              />
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}
