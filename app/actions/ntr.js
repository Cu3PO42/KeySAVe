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
export const NTR_ADD_KNOWN_TRADE_OFFSET = 'NTR_ADD_KNOWN_TRADE_OFFSET';

const gameNames = ['kujira-1' /* X */, 'kujira-2' /* Y */, 'sango-1' /* OR */, 'sango-2' /* AS */];
const gameOffsets = {
  xy: {
    boxes: 0x8C861C8,
    battleBox: 0x8C6AC2C,
  },
  oras: {
    boxes: 0x8C9E134,
    battleBox: 0x8C72330,
  }
};
const relativeData = new Buffer([0x74, 0x69, 0x6D, 0x65, 0x5F, 0x69, 0x63, 0x6F, 0x6E, 0x30, 0x31, 0x2E, 0x62, 0x63, 0x6C, 0x69, 0x6D]);
const relativeDataOffset = -0xB98;
function checkRelativeData(data, offset = 0) {
  let i = 0;
  for (; i < relativeData.length & ~3; i += 4) {
    if (relativeData.readUInt32LE(i) !== data.readUInt32LE(i + offset)) {
      return false;
    }
  }
  for (; i < relativeData.length; ++i) {
    if (relativeData.readUInt8(i) !== data.readUInt8(i + offset)) {
      return false;
    }
  }
  return true;
}

function findRelativeData(data) {
  let i = 0;
  for (; i < data.length; i += 4) {
    if (checkRelativeData(data, i)) {
      return i;
    }
  }

  throw new Error('Could not find relative data');
}

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
    game: name.startsWith('kujira') ? 'xy' : 'oras',
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
    name: 'TEA Box Dump'
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
    name: 'TEA Battle Box Dump'
  };
});

const ntrInitializeTradeDump = createAction(OPEN_FILE, () => ({ pokemon: [], goodKey: true, type: 'SAV', name: 'TEA Trade Dump' }));
const ntrSetInProgress = createAction(NTR_SET_IN_PROGRESS, (inProgress, intervalId) => ({ inProgress, intervalId }));
export const ntrAddKnownTradeOffset = createAction(NTR_ADD_KNOWN_TRADE_OFFSET, (offset, game) => ({ offset, game }));
export const ntrDumpTrade = client => async (dispatch, getState) => {
  logger.info('Starting trade dump');

  const { game, pid } = await getOffsets(client);
  const { ntr: { knownTradeOffsets: { [game]: possibleOffsets } } } = getState();
  let tradeOffset = undefined;
  for (const offset of possibleOffsets) {
    logger.debug(`Checking possible trade offset 0x${offset.toString(16)}`);
    const mem = await client.readMemory(offset - relativeDataOffset, 17, pid);
    if (checkRelativeData(mem)) {
      tradeOffset = offset;
    }
  }

  if (tradeOffset === undefined) {
    const mem = await client.readMemory(0x8500000, 0x100000, pid);
    try {
      tradeOffset = findRelativeData(mem) + relativeDataOffset + 0x8500000;
    } catch (e) {
      logger.info('Could not locate trade offset!');
    }
    dispatch(ntrAddKnownTradeOffset(tradeOffset, game));
  }

  logger.info(`Found trade offset at 0x${tradeOffset.toString(16)}`);

  const knownPokemon = new Set();
  let count = 0;

  dispatch(ntrInitializeTradeDump());
  const intervalId = setInterval(async () => {
    const ekxBuf = await client.readMemory(tradeOffset, 232, pid);
    if (ekxBuf.readUInt32LE(0) === 0) {
      return;
    }
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
