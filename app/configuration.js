import { registerFormattingPlugin, addFormattingOption } from './actions/format';
import { PkmList as PkmListHandlebars, FormattingOptions as FormattingOptionsHandlebars } from './components/formatters/handlebars';
import { PkmList as PkmListLegacy, FormattingOptions as FormattingOptionsLegacy } from './components/formatters/legacy';
import { PkmList as PkmListReddit, FormattingOptions as FormattingOptionsReddit } from './components/formatters/reddit';
import { PkmList as PkmListPretty, FormattingOptions as FormattingOptionsPretty } from './components/formatters/pretty';

export default function loadConfig(store) {
  store.dispatch(registerFormattingPlugin('Handlebars', PkmListHandlebars, FormattingOptionsHandlebars));
  store.dispatch(registerFormattingPlugin('Legacy', PkmListLegacy, FormattingOptionsLegacy));
  store.dispatch(registerFormattingPlugin('Reddit', PkmListReddit, FormattingOptionsReddit));
  store.dispatch(registerFormattingPlugin('Pretty', PkmListPretty, FormattingOptionsPretty));
  store.dispatch(addFormattingOption('Default', 'Handlebars', { title: 'ohi', format: 'B{{box}} - {{row}},{{column}} - {{speciesName}} ({{genderString gender}}) - {{natureName}} - {{abilityName}} - {{ivHp}}.{{ivAtk}}.{{ivDef}}.{{ivSpAtk}}.{{ivSpDef}}.{{ivSpe}} - {{typeName hpType}} [{{esv}}]' }));
  store.dispatch(addFormattingOption('Legacy', 'Legacy', { format: '{0} - {1} - {2} ({3}) - {4} - {5} - {6}.{7}.{8}.{9}.{10}.{11} - {12} - {13}' }));
  store.dispatch(addFormattingOption('Reddit', 'Reddit', {}));
  store.dispatch(addFormattingOption('Pretty', 'Pretty', {}))
}
