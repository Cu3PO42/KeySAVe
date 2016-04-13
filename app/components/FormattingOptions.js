import React from 'react';
import Paper from 'material-ui/lib/paper';
import MenuItem from 'material-ui/lib/menus/menu-item';
import SelectField from 'material-ui/lib/select-field';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import IconButton from 'material-ui/lib/icon-button';
import CreateIcon from 'material-ui/lib/svg-icons/content/create';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';
import CreateFormattingOption from './CreateFormattingOption';
import TextField from 'material-ui/lib/text-field';
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
    <SelectField onChange={(e, i, v) => changeFormatLanguage(v)} value={language} floatingLabelText="Language">
      {languages}
    </SelectField>
    <DropDownMenu value={currentIndex} onChange={(e, i, v) => selectFormattingOption(v)}>
      {formattingOptions.map((option, i) => <MenuItem key={i} value={i} primaryText={option.name} />)}
    </DropDownMenu>
    <TextField value={current.name} onChange={e => changeCurrentFormattingOptionName(e.target.value)} />
    <CreateFormattingOption optionCreated={addFormattingOption} plugins={plugins} />
    <IconButton onClick={cloneCurrentFormattingOption}><CreateIcon /></IconButton>
    <IconButton onClick={deleteCurrentFormattingOption} disabled={current.default}><DeleteIcon /></IconButton>
    <current.plugin.FormattingOptions
      updateCurrentFormat={updateCurrentFormattingOption}
      updateFormat={updateFormattingOption}
      format={current.format}
      index={currentIndex}
    />
  </Paper>
);

FormattingOptions.propTypes = {
  language: React.PropTypes.string.isRequired,
  changeFormatLanguage: React.PropTypes.func.isRequired
};
export default FormattingOptions;
