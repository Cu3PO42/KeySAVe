import { handleAction } from '../utils/handleAction';
import { FORMAT_LANGUAGE_CHANGED } from '../actions/format';

const defaultFormat = {
  language: 'en'
};

export default handleAction(FORMAT_LANGUAGE_CHANGED, (formattingOptions, action) => ({
  ...formattingOptions,
  ...action.payload
}), defaultFormat);
