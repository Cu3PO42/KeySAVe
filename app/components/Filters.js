import React, { PropTypes } from 'react';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import ExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import ExpandLessIcon from 'material-ui/lib/svg-icons/navigation/expand-less';
import Collapse from 'react-collapse';
import CheckBox from 'material-ui/lib/checkbox';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import RadioButton from 'material-ui/lib/radio-button';
import Select from 'react-select';
import { createSelector } from 'reselect';
import { Localization } from 'keysavcore';
import styles from './Filters.module.scss';

export default class Filters extends React.Component {
  static propTypes = {
    enabled: PropTypes.bool.isRequired,
    language: PropTypes.string.isRequired,
    eggsOnly: PropTypes.bool.isRequired,
    gender: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,

    toggleFilters: PropTypes.func.isRequired,
    setEggsOnly: PropTypes.func.isRequired,
    setGenderFilter: PropTypes.func.isRequired,
    setSpeciesFilter: PropTypes.func.isRequired
  };

  setEggsOnly = (e, v) => this.props.setEggsOnly(v)

  setGenderFilter = (e, v) => this.props.setGenderFilter(v)

  getSpeciesOptions = createSelector(
    () => this.props.language,
    lang => Localization[lang].species.map((e, i) => ({ value: i, label: e }))
  )

  render() {
    const {
      enabled,
      eggsOnly,
      gender,
      species,

      toggleFilters,
      setSpeciesFilter
    } = this.props;

    return (
      <div className={styles.container}>
        <RaisedButton
          label={enabled ? 'Disable Filters' : 'Enable Filters'}
          labelPosition="before"
          onClick={toggleFilters}
          icon={enabled ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        />
        <Collapse isOpened={enabled}>
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
              >
                <RadioButton label="♂" value="0" />
                <RadioButton label="♀" value="1" />
                <RadioButton label="Genderless" value="2" />
                <RadioButton label="Any" value="3" />
              </RadioButtonGroup>
              <Select
                name="species"
                value={species}
                onChange={setSpeciesFilter}
                options={this.getSpeciesOptions()}
                multi
              />
            </Paper>
          </div>
        </Collapse>
      </div>
    );
  }
}
