import { registerFormattingPlugin,
  addFormattingOption,
  overwriteSinglePluginOption,
  selectFormattingOption,
  changeFormatLanguage
} from './actions/format';
import options from './components/formatters';
import * as fs from 'fs-extra';
import { remote } from 'electron';
const { getPath } = remote.require('electron').app;

function parseConfig(store, config) {
  if (!config.version) {
    for (const option of config.formattingOptions) {
      store.dispatch(addFormattingOption(option.name, 'Handlebars', {
        header: option.header,
        format: option.format,
      }));
    }
  } else {
    for (const option of config.formattingOptions) {
      if (option.singleInstance) {
        store.dispatch(overwriteSinglePluginOption(option));
      } else {
        store.dispatch(addFormattingOption(option));
      }
    }
  }
  store.dispatch(selectFormattingOption(config.selectedFormatIndex));
  store.dispatch(changeFormatLanguage(config.language));
}

export default async function loadConfig(store) {
  for (const option of options) {
    store.dispatch(registerFormattingPlugin(option));
  }
  try {
    const file = await fs.readFileAsync(getPath('userData') + '/config.json', 'utf-8');
    parseConfig(store, JSON.parse(file));
  } catch (e) {
    try {
      const file = await fs.readFileAsync(getPath('documents') + '/KeySAVe/config.json', 'utf-8');
      parseConfig(store, JSON.parse(file));
    } catch (e) { console.log(e); }
  }
}
