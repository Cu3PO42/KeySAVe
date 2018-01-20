import createAction from '../utils/createAction';
export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';

export const openDialog = createAction(OPEN_DIALOG);
export const closeDialog = createAction(CLOSE_DIALOG);
