import createAction from '../utils/createAction';
import readFile from '../utils/readFile';
import { loadSavOrBv } from 'keysavcore';

export const OPEN_FILE = 'OPEN_FILE';
export const OPEN_FILE_DISMISS_ERROR = 'OPEN_FILE_DISMISS_ERROR';
export const ADD_POKEMON = 'ADD_POKEMON';

export const openFile = createAction(OPEN_FILE, async files => {
  const file = await readFile(files[0]);
  const res = await loadSavOrBv(file);
  const { reader } = res;
  if (res.type === 'SAV') {
    return {
      pokemon: reader.getAllPkx(),
      keyProperties: reader.isNewKey,
      type: 'SAV',
      name: files,
      generation: reader.generation,
    };
  } else {
    return {
      pokemon: reader.getAllPkx(),
      keyProperties: reader.workingKeys,
      type: 'BV',
      name: files,
      generation: reader.generation,
    };
  }
});
export const addPokemon = createAction(ADD_POKEMON);
export const dismissError = createAction(OPEN_FILE_DISMISS_ERROR);
