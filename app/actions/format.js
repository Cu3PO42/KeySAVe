import createAction from '../utils/createAction';

export const FORMAT_LANGUAGE_CHANGED = 'FORMAT_LANGUAGE_CHANGED';
export const ADD_FORMATTING_OPTION = 'ADD_FORMATTING_OPTION';
export const SELECT_FORMATTING_OPTION = 'SELECT_FORMATTING_OPTION';
export const DELETE_CURRENT_FORMATTING_OPTION = 'DELETE_CURRENT_FORMATTING_OPTION';
export const CLONE_CURRENT_FORMATTING_OPTION = 'CLONE_CURRENT_FORMATTING_OPTION';
export const UPDATE_CURRENT_FORMATTING_OPTION = 'UPDATE_CURRENT_FORMATTING_OPTION';
export const UPDATE_FORMATTING_OPTION = 'UPDATE_FRMATTING_OPTION';
export const CHANGE_CURRENT_FORMATTING_OPTION_NAME = 'CHANGE_CURRENT_FORMATTING_OPTION_NAME';
export const REGISTER_FORMATTING_PLUGIN = 'REGISTER_FORMATTING_PLUGIN';

export const changeFormatLanguage = createAction(FORMAT_LANGUAGE_CHANGED, language => language);
export const addFormattingOption = createAction(ADD_FORMATTING_OPTION, (name, plugin, format, d) => ({ name, plugin, format: (format || {}), default: d }));
export const selectFormattingOption = createAction(SELECT_FORMATTING_OPTION, id => id);
export const deleteCurrentFormattingOption = createAction(DELETE_CURRENT_FORMATTING_OPTION);
export const cloneCurrentFormattingOption = createAction(CLONE_CURRENT_FORMATTING_OPTION);
export const updateCurrentFormattingOption = createAction(UPDATE_CURRENT_FORMATTING_OPTION, format => format);
export const updateFormattingOption = createAction(UPDATE_FORMATTING_OPTION, (index, format) => ({ index, format }));
export const changeCurrentFormattingOptionName = createAction(CHANGE_CURRENT_FORMATTING_OPTION_NAME, name => name);
export const registerFormattingPlugin = createAction(REGISTER_FORMATTING_PLUGIN, (name, FormatPlugin, FormatOptionPlugin) => ({ name, FormatPlugin, FormatOptionPlugin }));
