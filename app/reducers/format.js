import { handleActions } from '../utils/handleAction';
import {
  FORMAT_LANGUAGE_CHANGED,
  ADD_FORMATTING_OPTION,
  CHANGE_CURRENT_FORMATTING_OPTION,
  DELETE_CURRENT_FORMATTING_OPTION,
  CLONE_CURRENT_FORMATTING_OPTION,
  REGISTER_FORMATTING_PLUGIN,
  SELECT_FORMATTING_OPTION,
  UPDATE_CURRENT_FORMATTING_OPTION,
  UPDATE_FORMATTING_OPTION,
  CHANGE_CURRENT_FORMATTING_OPTION_NAME
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

  [ADD_FORMATTING_OPTION]({ formattingOptions, language, plugins }, action) {
    const plugin = plugins.get(action.payload.plugin);
    const newOption = {
      ...action.payload,
      format: plugin.fixFormattingOption(action.payload.format),
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

  [CHANGE_CURRENT_FORMATTING_OPTION]({ formattingOptions, language, current, plugins, currentIndex }, action) {
    const newOption = {
      ...current,
      format: action.payload
    };
    const ret = formattingOptions.set(currentIndex, newOption);
    return {
      formattingOptions: ret,
      current: newOption,
      currentIndex,
      language,
      plugins
    };
  },

  [DELETE_CURRENT_FORMATTING_OPTION](options) {
    if (options.current.default || options.currentIndex === -1) {
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
    if (options.currentIndex === -1) {
      return options;
    }
    const { formattingOptions, language, plugins, currentIndex } = options;
    const current = {
      ...formattingOptions.get(currentIndex),
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
          isDefault: true,
          plugin
        }))) :
      options.formattingOptions.push({
        name: plugin.name,
        isDefault: true,
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
    return {
      ...options,
      current: format,
      currentIndex: action.payload
    };
  },

  [UPDATE_CURRENT_FORMATTING_OPTION](options, action) {
    if (options.currentIndex === -1) {
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
    if (options.currentIndex === -1) {
      return -1;
    }
    const oldFormat = options.formattingOptions.get(action.payload.index);
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
    if (options.currentIndex === -1) {
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
  }
}, defaultFormat);
