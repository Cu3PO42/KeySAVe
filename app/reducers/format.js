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
      FormatPlugin: () => undefined,
      FormattingOptionsPlugin: () => undefined
    },
    format: {},
    default: false
  }
};

export default handleActions({
  [FORMAT_LANGUAGE_CHANGED](formattingOptions, action) {
    return {
      ...formattingOptions,
      language: action.payload
    };
  },

  [ADD_FORMATTING_OPTION]({ formattingOptions, language, plugins }, action) {
    const newOption = {
      ...action.payload,
      plugin: plugins.get(action.payload.plugin)
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
    if (current.default) {
      return options;
    }
    const { formattingOptions, language, plugins, currentIndex, current } = options;
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

  [CLONE_CURRENT_FORMATTING_OPTION]({ formattingOptions, language, plugins, currentIndex }) {
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

  [REGISTER_FORMATTING_PLUGIN](options, action) {
    return {
      ...options,
      plugins: options.plugins.set(action.payload.name, action.payload)
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
    let { formattingOptions } = options;

    const current = {
      ...options.current,
      format: action.payload
    };
    formattingOptions = formattingOptions.set(options.currentIndex, current);
    return {
      ...options,
      formattingOptions,
      current
    };
  },

  [CHANGE_CURRENT_FORMATTING_OPTION_NAME](options, action) {
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
