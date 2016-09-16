import { handleActions } from '../utils/handleAction';
import {
  FORMAT_LANGUAGE_CHANGED,
  ADD_FORMATTING_OPTION,
  DELETE_CURRENT_FORMATTING_OPTION,
  CLONE_CURRENT_FORMATTING_OPTION,
  REGISTER_FORMATTING_PLUGIN,
  SELECT_FORMATTING_OPTION,
  UPDATE_CURRENT_FORMATTING_OPTION,
  UPDATE_FORMATTING_OPTION,
  CHANGE_CURRENT_FORMATTING_OPTION_NAME,
  OVERWRITE_SINGLE_PLUGIN_OPTION
} from '../actions/format';
import { List, Map } from 'immutable';

const defaultFormat = {
  language: 'en',
  plugins: new Map(),
  formattingOptions: new List(),
  current: {
    plugin: {
      name: 'none',
      PkmList: () => null,
      FormattingOptions: () => null
    },
    format: {},
    default: false
  },
  currentIndex: -1
};

export default handleActions({
  [FORMAT_LANGUAGE_CHANGED](formattingOptions, action) {
    return {
      ...formattingOptions,
      language: action.payload
    };
  },

  [ADD_FORMATTING_OPTION](options, action) {
    const { formattingOptions, language, plugins } = options;
    const plugin = plugins.get(action.payload.plugin);
    if (!plugin.multipleInstances) return options;
    const newOption = {
      name: action.payload.name,
      format: plugin.fixFormattingOption(action.payload.format),
      default: false,
      plugin
    };
    const ret = formattingOptions.push(newOption);
    const currentIndex = ret.size - 1;
    return {
      formattingOptions: ret,
      current: newOption,
      language,
      plugins,
      currentIndex
    };
  },

  [DELETE_CURRENT_FORMATTING_OPTION](options) {
    if (options.current.default || options.currentIndex === -1 || !options.current.plugin.multipleInstances) {
      return options;
    }
    const { formattingOptions, language, plugins, currentIndex } = options;
    const ret = formattingOptions.delete(currentIndex);
    const curIndex = ret.size >= currentIndex ? currentIndex - 1 : currentIndex;
    return {
      formattingOptions: ret,
      current: ret.get(curIndex),
      currentIndex: curIndex,
      language,
      plugins
    };
  },

  [CLONE_CURRENT_FORMATTING_OPTION](options) {
    if (!options.current.plugin.multipleInstances || options.currentIndex === -1) {
      return options;
    }
    const { formattingOptions, language, plugins, currentIndex } = options;
    const oldFormat = formattingOptions.get(currentIndex);
    const current = {
      ...oldFormat,
      name: oldFormat.name + ' (Clone)',
      default: false
    };
    const ret = formattingOptions.push(current);
    return {
      formattingOptions: ret,
      current,
      currentIndex: ret.size - 1,
      language,
      plugins
    };
  },

  [REGISTER_FORMATTING_PLUGIN](options, { payload: plugin }) {
    const plugins = options.plugins.set(plugin.name, plugin);
    const formattingOptions = plugin.multipleInstances ?
      options.formattingOptions.push(
        ...plugin.defaultOptions.map(e => ({
          name: e.name,
          format: plugin.fixFormattingOption(e.format),
          default: true,
          plugin
        }))) :
      options.formattingOptions.push({
        name: plugin.name,
        default: false,
        format: plugin.fixFormattingOption(plugin.defaultOptions),
        plugin
      });
    let currentIndex;
    let current;
    if (options.currentIndex === -1 && formattingOptions.size > 0) {
      currentIndex = 0;
      current = formattingOptions.get(0);
    } else {
      ({ currentIndex, current } = options);
    }
    return {
      ...options,
      plugins,
      formattingOptions,
      currentIndex,
      current
    };
  },

  [SELECT_FORMATTING_OPTION](options, action) {
    const format = options.formattingOptions.get(action.payload);
    if (format === undefined) {
      return options;
    }
    return {
      ...options,
      current: format,
      currentIndex: action.payload
    };
  },

  [UPDATE_CURRENT_FORMATTING_OPTION](options, action) {
    if (options.currentIndex === -1 || options.current.default) {
      return options;
    }
    const current = {
      ...options.current,
      format: {
        ...options.current.format,
        ...action.payload
      }
    };
    const formattingOptions = options.formattingOptions.set(options.currentIndex, current);
    return {
      ...options,
      formattingOptions,
      current
    };
  },

  [UPDATE_FORMATTING_OPTION](options, action) {
    const oldFormat = options.formattingOptions.get(action.payload.index);
    if (oldFormat === undefined || oldFormat.default) {
      return options;
    }
    const newFormat = {
      ...oldFormat,
      format: {
        ...oldFormat.format,
        ...action.payload.format
      }
    };
    return {
      ...options,
      formattingOptions: options.formattingOptions.set(action.payload.index, newFormat)
    };
  },

  [CHANGE_CURRENT_FORMATTING_OPTION_NAME](options, action) {
    if (options.currentIndex === -1 || options.current.default || !options.current.plugin.multipleInstances) {
      return options;
    }
    let { formattingOptions } = options;
    const current = {
      ...options.current,
      name: action.payload
    };
    formattingOptions = formattingOptions.set(options.currentIndex, current);
    return {
      ...options,
      formattingOptions,
      current
    };
  },

  [OVERWRITE_SINGLE_PLUGIN_OPTION](options, { payload: { name, format } }) {
    const [index, oldOption] = options.formattingOptions.findEntry(e => e.name === name);
    const newOption = {
      ...oldOption,
      format
    };
    const formattingOptions = options.formattingOptions.set(index, newOption);
    if (options.currentIndex === index) {
      return {
        ...options,
        formattingOptions,
        current: newOption
      };
    }

    return {
      ...options,
      formattingOptions
    };
  },

  REHYDRATE(state, { payload }) {
    if (payload.reducer !== 'format') return state;

    const { language, formattingOptions, currentIndex } = payload.state;
    let formattingOptionsState = state.formattingOptions;
    for (const option of formattingOptions) {
      if (option.singleInstance) {
        const [index, oldOption] = formattingOptionsState.findEntry(e => e.name === option.name);
        const newOption = { ...oldOption, format: option.format };
        formattingOptionsState = formattingOptionsState.set(index, newOption);
      } else {
        const plugin = state.plugins.get(option.plugin);
        if (!plugin.multipleInstances) continue;
        const newOption = {
          name: option.name,
          format: plugin.fixFormattingOption(option.format),
          default: false,
          plugin
        };
        formattingOptionsState = formattingOptionsState.push(newOption);
      }
    }
    return {
      ...state,
      language,
      currentIndex,
      formattingOptions: formattingOptionsState,
      current: formattingOptionsState.get(currentIndex)
    };
  }
}, defaultFormat);
