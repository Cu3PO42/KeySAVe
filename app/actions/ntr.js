import createAction from '../utils/createAction';

export const OPEN_NTR_MENU = 'OPEN_NTR_MENU';
export const SET_NTR_GAME = 'SET_NTR_GAME';
export const SET_NTR_REGION = 'SET_NTR_REGION';
export const SET_NTR_IP = 'SET_NTR_IP';
export const NTR_CONNECT = 'SET_NTR_CONNECT';

export const openNtrMenu = createAction(OPEN_NTR_MENU);
export const setNtrGame = createAction(SET_NTR_GAME);
export const setNtrRegion = createAction(SET_NTR_REGION);
export const setNtrIp = createAction(SET_NTR_IP);
export const ntrConnected = createAction(NTR_CONNECT);
