import Loadable from 'react-loadable';
import Loading from '../../Loading';

export const PkmList = Loadable({
  loader: () =>
    import(/* webpackChunkName: "formatters/pretty" */ './components').then(e => e.PkmList),
  loading: Loading,
});
export const FormattingOptions = Loadable({
  loader: () =>
    import(/* webpackChunkName: "formatters/pretty" */ './components').then(
      e => e.FormattingOptions
    ),
  loading: Loading,
});

export const name = 'Pretty';
export const multipleInstances = false;

export function fixFormattingOption() {
  return {};
}

export const defaultOptions = {};
