export { default as PkmList } from './PkmListLegacy';
export { default as FormattingOptions } from './FormattingOptionsLegacy';

export const name = 'Legacy (KeySAV2)';
export const multipleInstances = true;

const defaultOption = {
  format: '',
  header: '',
  ghost: 'mark',
  splitBoxes: false,
  alwaysShowEsv: true
};

export function fixFormattingOption(option) {
  const res = {};
  for (const key in defaultOption) {
    if (!defaultOption.hasOwnProperty(key)) continue;
    if (option[key] !== undefined) res[key] = option[key];
    else res[key] = defaultOption[key];
  }
  return res;
}

export const defaultOptions = [];
