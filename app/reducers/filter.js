import { handleActions } from '../utils/handleAction';
import {
  SET_FILTER_BV,
  SET_FILTER_SAV,
  TOGGLE_FILTERS,
  SET_EGGS_ONLY,
  SET_SPECIES_FILTER,
  SET_GENDER_FILTER,
  SET_HP_FILTER,
  SET_NATURE_FILTER,
  SET_ABILITY_FILTER,
  SET_HA_ONLY,
  SET_SPECIAL_ATTACKER,
  SET_TRICK_ROOM,
  SET_PERFECT_IV,
  SET_NUM_PERFECT_IVS,
  SET_ALL_PERFECT_IVS,
  SET_SHINIES_ONLY,
  SET_SHINY_OVERRIDE,
  SET_EGGS_HAVE_MY_SV,
  SET_EGGS_HAVE_SVS,
  SET_CUSTOM_FILTER
} from '../actions/filter';
import { FORMAT_LANGUAGE_CHANGED } from '../actions/format';
import { Localization } from 'keysavcore';

function fixSelectedOptions(options, lookup) {
  return options.map(({ value }) => ({ value, label: lookup[value] }));
}

function compileCustomFilter(filter) {
  if (filter === '') {
    return undefined;
  } else {
    try {
      /* eslint-disable no-eval */
      return eval(`(function(pkm) { return !!(${filter});})`);
      /* eslint-enable no-eval */
    } catch (e) {
      return null;
    }
  }
}

const initialFilter = {
  enabled: false,
  isOpponent: false,
  lower: 1,
  upper: 31,
  eggsOnly: false,
  species: [],
  gender: '3',
  hpTypes: [],
  natures: [],
  abilities: [],
  haOnly: false,
  specialAttacker: false,
  trickroom: false,
  ivs: {
    hp: false,
    atk: false,
    def: false,
    spAtk: false,
    spDef: false,
    spe: false
  },
  numPerfectIvs: 0,
  shiniesOnly: false,
  shinyOverride: false,
  eggsHaveMySv: false,
  svs: '',
  customFilter: undefined,
  customFilterRaw: ''
};

export default handleActions({
  [SET_FILTER_BV](state, { payload }) {
    return {
      ...state,
      isOpponent: payload
    };
  },
  [SET_FILTER_SAV](state, { payload: { lower, upper } }) {
    return {
      ...state,
      lower: Math.min(lower, state.upper),
      upper: Math.max(upper, state.lower)
    };
  },
  [TOGGLE_FILTERS](state) {
    return {
      ...state,
      enabled: !state.enabled
    };
  },
  [SET_EGGS_ONLY](state, { payload }) {
    return {
      ...state,
      eggsOnly: payload
    };
  },
  [SET_SPECIES_FILTER](state, { payload }) {
    return {
      ...state,
      species: payload
    };
  },
  [SET_GENDER_FILTER](state, { payload }) {
    return {
      ...state,
      gender: payload
    };
  },
  [SET_HP_FILTER](state, { payload }) {
    return {
      ...state,
      hpTypes: payload
    };
  },
  [SET_NATURE_FILTER](state, { payload }) {
    return {
      ...state,
      natures: payload
    };
  },
  [SET_ABILITY_FILTER](state, { payload }) {
    return {
      ...state,
      abilities: payload
    };
  },
  [SET_HA_ONLY](state, { payload }) {
    return {
      ...state,
      haOnly: payload
    };
  },
  [SET_SPECIAL_ATTACKER](state, { payload }) {
    return {
      ...state,
      specialAttacker: payload
    };
  },
  [SET_TRICK_ROOM](state, { payload }) {
    return {
      ...state,
      trickroom: payload
    };
  },
  [SET_PERFECT_IV](state, { payload: { iv, isPerfect } }) {
    return {
      ...state,
      ivs: {
        ...state.ivs,
        [iv]: isPerfect
      }
    };
  },
  [SET_NUM_PERFECT_IVS](state, { payload }) {
    return {
      ...state,
      numPerfectIvs: payload
    };
  },
  [SET_ALL_PERFECT_IVS](state, { payload }) {
    return {
      ...state,
      ivs: {
        hp: payload,
        atk: payload,
        def: payload,
        spAtk: payload,
        spDef: payload,
        spe: payload
      }
    };
  },
  [SET_SHINIES_ONLY](state, { payload }) {
    return {
      ...state,
      shiniesOnly: payload
    };
  },
  [SET_SHINY_OVERRIDE](state, { payload }) {
    return {
      ...state,
      shinyOverride: payload
    };
  },
  [SET_EGGS_HAVE_MY_SV](state, { payload }) {
    return {
      ...state,
      eggsHaveMySv: payload
    };
  },
  [SET_EGGS_HAVE_SVS](state, { payload }) {
    return {
      ...state,
      svs: payload
    };
  },
  [SET_CUSTOM_FILTER](state, { payload }) {
    return {
      ...state,
      customFilter: compileCustomFilter(payload),
      customFilterRaw: payload
    };
  },

  [FORMAT_LANGUAGE_CHANGED](state, { payload }) {
    const local = Localization[payload];
    return {
      ...state,
      species: fixSelectedOptions(state.species, local.species),
      hpTypes: fixSelectedOptions(state.hpTypes, local.types),
      natures: fixSelectedOptions(state.natures, local.natures),
      abilities: fixSelectedOptions(state.abilities, local.abilities)
    };
  },

  REHYDRATE(state, { payload }) {
    if (payload.reducer !== 'filter') return state;

    return {
      ...state,
      ...payload.state,
      customFilter: compileCustomFilter(payload.state.customFilterRaw)
    };
  }
}, initialFilter);
