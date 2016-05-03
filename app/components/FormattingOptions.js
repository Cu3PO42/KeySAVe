import React from 'react';
import Paper from 'material-ui/lib/paper';
import MenuItem from 'material-ui/lib/menus/menu-item';
import SelectField from 'material-ui/lib/select-field';
import IconButton from 'material-ui/lib/icon-button';
import CreateIcon from 'material-ui/lib/svg-icons/content/create';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';
import LockedIcon from 'material-ui/lib/svg-icons/action/lock';
import CreateFormattingOption from './CreateFormattingOption';
import Divider from 'material-ui/lib/divider';
import TextField from 'material-ui/lib/text-field';
import { Seq } from 'immutable';
import styles from './FormattingOptions.module.scss';

const languages = [
  <MenuItem key={1} value="en" primaryText="English"/>,
  <MenuItem key={2} value="ja" primaryText="Japanese"/>,
  <MenuItem key={3} value="de" primaryText="German"/>,
  <MenuItem key={4} value="fr" primaryText="French"/>,
  <MenuItem key={5} value="it" primaryText="Italian"/>,
  <MenuItem key={6} value="es" primaryText="Spanish"/>,
  <MenuItem key={7} value="ko" primaryText="Korean"/>
];

const FormattingOptions = ({ language, changeFormatLanguage, formattingOptions, current, currentIndex, plugins, addFormattingOption, cloneCurrentFormattingOption, updateCurrentFormattingOption, updateFormattingOption, selectFormattingOption, deleteCurrentFormattingOption, changeCurrentFormattingOptionName }) => (
  <Paper className={styles.paper}>
    <h2>Formatting</h2>
    <div className={styles.topRow}>
      <SelectField
        onChange={(e, i, v) => changeFormatLanguage(v)}
        value={language}
        floatingLabelText="Language"
        className={styles.languageSelector}
        style={{ width: '120px', marginRight: '15px' }}
      >
        {languages}
      </SelectField>
      <SelectField
        value={currentIndex}
        onChange={(e, i, v) => selectFormattingOption(v)}
        floatingLabelText="Formatting Option"
        className={styles.formattingOptions}
        style={{ marginRight: '15px' }}
      >
        {formattingOptions
          .entrySeq()
          .groupBy(([, e]) => e.plugin)
          .map((options, { name }) => new Seq([
            <MenuItem primaryText={name} key={name} disabled className={styles.formatPluginName} />,
            options.map(([i, option]) =>
              <MenuItem
                primaryText={option.name}
                key={i}
                value={i}
                rightIcon={option.default ? <LockedIcon /> : undefined}
              />),
            <Divider key={'@DIVIDER:' + name} />]))
          .valueSeq()
          .flatten()
          .skipLast(1)
        }
      </SelectField>
      <TextField
        value={current.name}
        disabled={current.default || !current.plugin.multipleInstances}
        onChange={e => changeCurrentFormattingOptionName(e.target.value)}
        floatingLabelText="Name"
        className={styles.formatName}
        style={{ marginRight: '15px' }}
      />
      <TextField
        value={current.plugin.name}
        disabled
        floatingLabelText="Plugin"
        style={{ width: '150px' }}
      />
      <div className={styles.flexFill} />
      <CreateFormattingOption optionCreated={addFormattingOption} plugins={plugins} />
      <IconButton
        onClick={cloneCurrentFormattingOption}
        disabled={!current.plugin.multipleInstances}
        tooltip="Clone formatting option"
      ><CreateIcon /></IconButton>
      <IconButton
        onClick={deleteCurrentFormattingOption}
        disabled={current.default || !current.plugin.multipleInstances}
        tooltip="Delete formatting option"
      ><DeleteIcon /></IconButton>
    </div>
    <current.plugin.FormattingOptions
      updateCurrentFormat={updateCurrentFormattingOption}
      updateFormat={updateFormattingOption}
      format={current.format}
      index={currentIndex}
      isDefault={current.default}
    />
  </Paper>
);

FormattingOptions.propTypes = {
  language: React.PropTypes.string.isRequired,
  changeFormatLanguage: React.PropTypes.func.isRequired
};
export default FormattingOptions;
