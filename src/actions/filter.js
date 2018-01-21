import createAction from '../utils/createAction';

export const SET_FILTER_BV = 'SET_FILTER_BV';
export const SET_FILTER_SAV = 'SET_FILTER_SAV';
export const TOGGLE_FILTERS = 'TOGGLE_FILTERS';
export const SET_EGGS_ONLY = 'SET_EGGS_ONLY';
export const SET_SPECIES_FILTER = 'SET_SPECIES_FILTER';
export const SET_GENDER_FILTER = 'SET_GENDER_FILTER';
export const SET_HP_FILTER = 'SET_HP_FILTER';
export const SET_NATURE_FILTER = 'SET_NATURE_FILTER';
export const SET_ABILITY_FILTER = 'SET_ABILITY_FILTER';
export const SET_HA_ONLY = 'SET_HA_ONLY';
export const SET_SPECIAL_ATTACKER = 'SET_SPECIAL_ATTACKER';
export const SET_TRICK_ROOM = 'SET_TRICK_ROOM';
export const SET_PERFECT_IV = 'SET_PERFECT_IV';
export const SET_NUM_PERFECT_IVS = 'SET_NUM_PERFECT_IVS';
export const SET_ALL_PERFECT_IVS = 'SET_ALL_PERFECT_IVS';
export const SET_SHINIES_ONLY = 'SET_SHINIES_ONLY';
export const SET_SHINY_OVERRIDE = 'SET_SHINY_OVERRIDE';
export const SET_EGGS_HAVE_MY_SV = 'SET_EGGS_HAVE_MY_SV';
export const SET_EGGS_HAVE_SVS = 'SET_EGGS_HAVE_SVS';
export const SET_CUSTOM_FILTER = 'SET_CUSTOM_FILTER';

export const setFilterBv = createAction(SET_FILTER_BV);
export const setFilterSav = createAction(SET_FILTER_SAV, (lower, upper) => ({ lower, upper }));
export const toggleFilters = createAction(TOGGLE_FILTERS, () => undefined);
export const setEggsOnly = createAction(SET_EGGS_ONLY);
export const setSpeciesFilter = createAction(SET_SPECIES_FILTER, options =>
  options.map(({ value }) => value)
);
export const setGenderFilter = createAction(SET_GENDER_FILTER);
export const setHpFilter = createAction(SET_HP_FILTER, options =>
  options.map(({ value }) => value)
);
export const setNatureFilter = createAction(SET_NATURE_FILTER, options =>
  options.map(({ value }) => value)
);
export const setAbilityFilter = createAction(SET_ABILITY_FILTER, options =>
  options.map(({ value }) => value)
);
export const setHaOnly = createAction(SET_HA_ONLY);
export const setSpecialAttacker = createAction(SET_SPECIAL_ATTACKER);
export const setTrickRoom = createAction(SET_TRICK_ROOM);
export const setPerfectIv = createAction(SET_PERFECT_IV, (iv, isPerfect) => ({ iv, isPerfect }));
export const setNumPerfectIvs = createAction(SET_NUM_PERFECT_IVS);
export const setAllPerfectIvs = createAction(SET_ALL_PERFECT_IVS);
export const setShiniesOnly = createAction(SET_SHINIES_ONLY);
export const setShinyOverride = createAction(SET_SHINY_OVERRIDE);
export const setEggsHaveMySv = createAction(SET_EGGS_HAVE_MY_SV);
export const setEggsHaveSvs = createAction(SET_EGGS_HAVE_SVS);
export const setCustomFilter = createAction(SET_CUSTOM_FILTER);
