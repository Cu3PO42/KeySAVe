import { OPEN_FILE, addPokemon } from './file';
import createAction from '../utils/createAction';
import NtrClient from 'ntrclient';
import { loadSav, Pkx } from 'keysavcore';
import { copy } from 'keysavcore/util';
import logger from '../logger';

export const OPEN_NTR_MENU = 'OPEN_NTR_MENU';
export const SET_NTR_IP = 'SET_NTR_IP';
export const NTR_CONNECT = 'NTR_CONNECT';
export const NTR_DISCONNECT = 'NTR_DISCONNECT';
export const NTR_SET_IN_PROGRESS = 'NTR_SET_IN_PROGRESS';
export const NTR_CANCEL_IN_PROGRESS = 'NTR_CANCEL_IN_PROGRESS';

const gameNames = ['kujira-1' /* X */, 'kujira-2' /* Y */, 'sango-1' /* OR */, 'sango-2' /* AS */];
const gameOffsets = {
  xy: {
    boxes: 0x8C861C8,
    battleBox: 0x8C6AC2C,
    trade: 0x8509DD4,
  },
  oras: {
    boxes: 0x8C9E134,
    battleBox: 0x8C72330,
    trade: 0x8523C48,
  }
};

async function getOffsets(client) {
  const processes = await client.listProcesses();
  const proc = processes.find(({ name }) => gameNames.includes(name));
  if (proc === undefined) {
    throw new Error('Game not running.');
  }
  const { pid, name } = proc;
  logger.info(`Game running: ${name}`);
  return {
    pid,
    offsets: name.startsWith('kujira') ? gameOffsets.xy : gameOffsets.oras
  };
}

export const openNtrMenu = createAction(OPEN_NTR_MENU);
export const setNtrIp = createAction(SET_NTR_IP);
const ntrConnect_ = createAction(NTR_CONNECT, async (ip, ...args) => {
  const client = await NtrClient.connectNTR(ip, ...args);
  logger.info(`Connected to 3DS at ${ip}`);
  return client;
});
export const ntrDisconnect = createAction(NTR_DISCONNECT);
export const ntrConnect = ip => dispatch => dispatch(ntrConnect_(ip, () => {
  logger.info('3DS disconnected');
  dispatch(ntrDisconnect);
}));

export const ntrDumpBoxes = createAction(OPEN_FILE, async (client) => {
  const { offsets: { boxes: offset }, pid } = await getOffsets(client);

  const boxes = await client.readMemory(offset, 930 * 232, pid);
  const boxesUi8 = new Uint8Array(boxes.buffer, boxes.byteOffset, boxes.byteLength);
  const reader = await loadSav(boxesUi8);
  logger.info('Dumped boxes from game');
  return {
    pokemon: reader.getAllPkx(),
    goodKey: true,
    type: 'SAV',
    name: 'NTR Box Dump'
  };
});

export const ntrDumpBattleBox = createAction(OPEN_FILE, async (client) => {
  const { offsets: { battleBox: offset }, pid } = await getOffsets(client);

  const battleBox = await client.readMemory(offset, 6 * 232, pid);
  const battleBoxUi8 = new Uint8Array(battleBox.buffer, battleBox.byteOffset, battleBox.byteLength);
  const boxes = new Uint8Array(930 * 232);
  copy(battleBoxUi8, 0, boxes, 0, 6 * 232);
  const reader = await loadSav(boxes);
  logger.info('Dumped battle box from game');
  return {
    pokemon: reader.getAllPkx(),
    goodKey: true,
    type: 'SAV',
    name: 'NTR Battle Box Dump'
  };
});

const ntrInitializeTradeDump = createAction(OPEN_FILE, () => ({ pokemon: [], goodKey: true, type: 'SAV', name: 'NTR Trade Dump' }));
const ntrSetInProgress = createAction(NTR_SET_IN_PROGRESS, (inProgress, intervalId) => ({ inProgress, intervalId }));
export const ntrDumpTrade = (client) => async dispatch => {
  dispatch(ntrInitializeTradeDump());
  logger.info('Starting trade dump');

  const { offsets: { trade: offset }, pid } = await getOffsets(client);
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
  dispatch(ntrSetInProgress('trade', intervalId));
};
export const ntrCancelInProgress = createAction(NTR_CANCEL_IN_PROGRESS, () => logger.info('Cancelled trade dump'));
