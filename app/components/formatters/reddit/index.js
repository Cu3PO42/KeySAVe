export { default as PkmList } from './PkmListReddit';
export { default as FormattingOptions } from './FormattingOptionsReddit';

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
