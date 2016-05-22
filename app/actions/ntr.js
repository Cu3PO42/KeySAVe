import { OPEN_FILE } from './file';
import createAction from '../utils/createAction';
import NtrClient from 'ntrclient';
import { loadSav } from 'keysavcore';

export const OPEN_NTR_MENU = 'OPEN_NTR_MENU';
export const SET_NTR_GAME = 'SET_NTR_GAME';
export const SET_NTR_REGION = 'SET_NTR_REGION';
export const SET_NTR_IP = 'SET_NTR_IP';
export const NTR_CONNECT = 'NTR_CONNECT';
export const NTR_DISCONNECT = 'NTR_DISCONNECT';

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
    name: 'NTR Dump'
  };
});
