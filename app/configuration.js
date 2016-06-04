import { registerFormattingPlugin,
  addFormattingOption,
  overwriteSinglePluginOption,
  selectFormattingOption,
  changeFormatLanguage
} from './actions/format';
import options from './components/formatters';
import * as fs from 'fs-extra';
import { version } from '../package.json';
import logger from './logger';
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
        store.dispatch(addFormattingOption(option.name, option.plugin, option.format));
      }
    }
  }
  if (config.selectedFormatIndex !== undefined) store.dispatch(selectFormattingOption(config.selectedFormatIndex));
  if (config.language !== undefined) store.dispatch(changeFormatLanguage(config.language));
}

function serializeConfig(store) {
  const { format } = store.getState();
  const formattingOptions = format.formattingOptions
    .valueSeq()
    .filter(e => !e.default)
    .map(({ name, plugin: { name: plugin, multipleInstances }, format }) => ({
      name, plugin, format, singleInstance: !multipleInstances
    }))
    .toArray();
  return {
    formattingOptions,
    language: format.language,
    selectedFormatIndex: format.currentIndex,
    version
  };
}

export default async function loadConfig(store) {
  for (const option of options) {
    store.dispatch(registerFormattingPlugin(option));
  }
  try {
    const path = getPath('userData') + '/config.json';
    const file = await fs.readFileAsync(path, 'utf-8');
    logger.info(`Loading config from ${path}`);
    parseConfig(store, JSON.parse(file));
  } catch (e) {
    try {
      const path = getPath('documents') + '/KeySAVe/config.json';
      const file = await fs.readFileAsync(path, 'utf-8');
      logger.info(`Loading config from ${path}`);
      parseConfig(store, JSON.parse(file));
    } catch (e) { /* ignore */ }
  }
  window.addEventListener('beforeunload', async () => {
    const config = serializeConfig(store);
    await fs.writeFileAsync(getPath('userData') + '/config.json', JSON.stringify(config, null, '    '), 'utf-8');
    logger.info('Saved config');
  }, false);
}

export async function importKeySAV2Config(folder, store) {
  const files = await fs.readdirAsync(folder);
  const dataFolder = files.includes('data') && files.includes('KeySAV2.exe') &&
     !(await fs.statAsync(folder + '/data')).isFile() ?
     folder + '/data' : folder;
  const configFile = dataFolder + '/config.ini';
  if (! await fs.existsAsync(configFile)) {
    return;
  }
  const lines = (await fs.readFileAsync(configFile, 'utf-8')).match(/.+/g);
  const formats = lines.slice(1, 3);
  const curOption = store.getState().format.currentIndex;
  let i = 0;
  for (const format of formats) {
    store.dispatch(addFormattingOption(`Imported (${++i})`, 'Legacy (KeySAV2)', { format }));
  }
  store.dispatch(selectFormattingOption(curOption));
}
