import Loadable from 'react-loadable';
import Loading from '../../Loading';

export const PkmList = Loadable({
  loader: () => import(/* webpackChunkName: "formatters/reddit" */ './components').then(e => e.PkmList),
  loading: Loading
});
export const FormattingOptions = Loadable({
  loader: () => import(/* webpackChunkName: "formatters/reddit" */ './components').then(e => e.FormattingOptions),
  loading: Loading
});

export const name = 'Reddit';
export const multipleInstances = false;

export const defaultOptions = {
  ghosts: 'mark',
  boldPerfectIVs: false,
  splitBoxes: false,
  color: 0
};

export function fixFormattingOption(option) {
  const res = {};
  for (const key in defaultOptions) {
    if (!defaultOptions.hasOwnProperty(key)) continue;
    if (option[key] !== undefined) res[key] = option[key];
    else res[key] = defaultOptions[key];
  }
  return res;
}
