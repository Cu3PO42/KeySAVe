import { OPEN_FILE, addPokemon } from './file';
import createAction from '../utils/createAction';
import NtrClient from 'ntrclient';
import { loadSav, Pkx } from 'keysavcore';

export const OPEN_NTR_MENU = 'OPEN_NTR_MENU';
export const SET_NTR_GAME = 'SET_NTR_GAME';
export const SET_NTR_REGION = 'SET_NTR_REGION';
export const SET_NTR_IP = 'SET_NTR_IP';
export const NTR_CONNECT = 'NTR_CONNECT';
export const NTR_DISCONNECT = 'NTR_DISCONNECT';
export const NTR_SAVE_INTERVAL = 'NTR_SAVE_INTERVAL';
export const NTR_SET_PROGRESS = 'NTR_SET_PROGRESS';

export const openNtrMenu = createAction(OPEN_NTR_MENU);
export const setNtrGame = createAction(SET_NTR_GAME);
export const setNtrRegion = createAction(SET_NTR_REGION);
export const setNtrIp = createAction(SET_NTR_IP);
const ntrConnect_ = createAction(NTR_CONNECT, NtrClient.connectNTR);
export const ntrDisconnect = createAction(NTR_DISCONNECT);
export const ntrConnect = ip => dispatch => dispatch(ntrConnect_(ip, () => dispatch(ntrDisconnect)));
export const ntrDumpBoxes = createAction(OPEN_FILE, async (client, game, region) => {
  const offset = 0x8C9E134; // TODO need more offsets
  const processes = await client.listProcesses();
  const proc = processes.find(({ name }) => name === 'sango-1');
  if (proc === undefined) {
    throw new Error('Game not running.');
  }
  const { pid } = proc;
  const boxes = await client.readMemory(offset, 930 * 232, pid);
  const boxesUi8 = new Uint8Array(boxes.buffer, boxes.byteOffset, boxes.byteLength);
  const reader = await loadSav(boxesUi8);
  return {
    pokemon: reader.getAllPkx(),
    goodKey: true,
    type: 'SAV',
    name: 'NTR Box Dump'
  };
});

const ntrInitializeTradeDump = createAction(OPEN_FILE, () => ({ pokemon: [], goodKey: true, type: 'SAV', name: 'NTR Trade Dump' }));
const ntrSaveInterval = createAction(NTR_SAVE_INTERVAL);
const ntrSetProgress = createAction(NTR_SET_PROGRESS);
export const ntrDumpTrade = (client, game, region) => async dispatch => {
  dispatch(ntrInitializeTradeDump());
  dispatch(ntrSetProgress('trade'));

  const offset = 0x8523c48;
  //const offset = 0x8C9E134; // TODO need more offsets
  const processes = await client.listProcesses();
  const proc = processes.find(({ name }) => name === 'sango-1');
  if (proc === undefined) {
    throw new Error('Game not running.');
  }
  const { pid } = proc;
  const knownPokemon = new Set();
  let count = 0;

  const intervalId = setInterval(async () => {
    const ekxBuf = await client.readMemory(offset, 232, pid);
    const ekxUi8 = new Uint8Array(ekxBuf.buffer, ekxBuf.byteOffset, ekxBuf.byteLength);
    const pkxUi8 = Pkx.decrypt(ekxUi8);
    const pkxDv = new DataView(pkxUi8.buffer, pkxUi8.byteOffset, pkxUi8.byteLength);
    if (!Pkx.verifyChk(pkxUi8)) {
      return;
    }
    const key = pkxDv.getUint32(0) * 0x10000 + pkxDv.getUint16(6);
    if (knownPokemon.has(key)) {
      return;
    }
    knownPokemon.add(key);
    const pkx = new Pkx(pkxUi8, Math.floor(count / 30), count % 30, false);
    ++count;
    dispatch(addPokemon([pkx]));
  }, 250);
  dispatch(ntrSaveInterval(intervalId));
};
