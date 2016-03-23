import { registerFormattingPlugin, addFormattingOption } from './actions/format';
import { PkmList, FormattingOptions } from './components/formatters/handlebars';

export default function loadConfig(store) {
  store.dispatch(registerFormattingPlugin('Handlebars', PkmList, FormattingOptions));
  store.dispatch(addFormattingOption('Handlebars', { title: 'ohi', format: 'B{{box}} - {{row}},{{column}} - {{speciesName}} ({{genderString gender}}) - {{natureName}} - {{abilityName}} - {{ivHp}}.{{ivAtk}}.{{ivDef}}.{{ivSpAtk}}.{{ivSpDef}}.{{ivSpe}} - {{typeName hpType}} [{{esv}}]' }));
}
