import { registerFormattingPlugin,
  addFormattingOption,
  overwriteSinglePluginOption,
  selectFormattingOption,
  changeFormatLanguage
} from './actions/format';
import options from './components/formatters';
import { setEggsHaveSvs } from './actions/filter';
import { version } from '../package.json';
import semver from 'semver';


function parseConfig(store, config) {
  if (!config.version) {
    for (const option of config.formattingOptions) {
      store.dispatch(addFormattingOption(option.name, 'Handlebars', {
        header: option.header,
        format: option.format,
      }));
    }
  } else if (semver.lt(config.version, '1.2.4')) {
    for (const option of config.formattingOptions) {
      if (option.singleInstance) {
        store.dispatch(overwriteSinglePluginOption(option));
      } else {
        store.dispatch(addFormattingOption(option.name, option.plugin, option.format));
      }
    }
    if (config.selectedFormatIndex !== undefined) store.dispatch(selectFormattingOption(config.selectedFormatIndex));
    if (config.language !== undefined) store.dispatch(changeFormatLanguage(config.language));
    if (config.svs !== undefined) store.dispatch(setEggsHaveSvs(config.svs));
  } else {
    console.log('REHYDRATING...');
    const { state } = config;
    for (const key of Object.keys(state)) {
      store.dispatch({
        type: 'REHYDRATE',
        error: false,
        payload: { reducer: key, state: state[key], version }
      });
    }
  }
}

/*function serializeConfig(store, { blacklist, serializers }) {
  const ret = Object.create(null);
  const state = store.getState();
  for (const key of Object.keys(state)) {
    const serializer = serializers[key];
    if (serializer !== undefined) {
      const serialized = serializer(state[key]);
      if (serialized !== undefined) {
        ret[key] = serialized;
      }
      continue;
    }

    const reducerBlacklist = blacklist[key];
    if (reducerBlacklist === undefined) {
      ret[key] = state[key];
    } else if (Array.isArray(reducerBlacklist)) {
      const reducerState = state[key];
      const serializedState = Object.create(null);
      for (const key of Object.keys(reducerState)) {
        if (!reducerBlacklist.includes(key)) {
          serializedState[key] = reducerState[key];
        }
      }
      ret[key] = serializedState;
    }
  }
  return { version, state: ret };
}*/

export default async function loadConfig(store) {
  for (const option of options) {
    store.dispatch(registerFormattingPlugin(option));
  }
  /*try {
    const path = getPath('userData') + '/config.json';
    const file = await fs.readFileAsync(path, 'utf-8');
    console.log(`Loading config from ${path}`);
    parseConfig(store, JSON.parse(file));
  } catch (e) {
    try {
      const path = getPath('documents') + '/KeySAVe/config.json';
      const file = await fs.readFileAsync(path, 'utf-8');
      console.log(`Loading config from ${path}`);
      parseConfig(store, JSON.parse(file));
    } catch (e) {
      console.log('No config file found');
    }
  }*/

  /*window.addEventListener('beforeunload', async (e) => {
    console.log('Saving config');
    const config = serializeConfig(store, {
      blacklist: {
        filter: ['customFilter'],
        ntr: ['intervalId', 'inProgress', 'connectionError', 'tradeOffsetError'],
        updater: null
      },
      serializers: {
        format: format => ({
          formattingOptions: format.formattingOptions
            .valueSeq()
            .filter(e => !e.default)
            .map(({ name, plugin: { name: plugin, multipleInstances }, format }) => ({
              name, plugin, format, singleInstance: !multipleInstances
            }))
            .toArray(),
          currentIndex: format.currentIndex,
          language: format.language
        })
      }
    });
    fs.writeFileSync(getPath('userData') + '/config.json', JSON.stringify(config, null, '    '), 'utf-8');
    console.log('Saved config');
  }, false);*/
}
