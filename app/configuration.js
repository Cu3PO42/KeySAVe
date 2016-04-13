import { registerFormattingPlugin } from './actions/format';
import options from './components/formatters';

export default function loadConfig(store) {
  for (const option of options) {
    store.dispatch(registerFormattingPlugin(option));
  }
}
