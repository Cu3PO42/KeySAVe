import createAction from '../utils/createAction';

export const UPDATE_AVAILABLE = 'UPDATE_AVAILABLE';
export const UPDATE_PROGRESS = 'UPDATE_PROGRESS';
export const UPDATE_DISMISS = 'UPDATE_DISMISS';

export const setUpdateAvailable = createAction(UPDATE_AVAILABLE, (changelog) => ({ changelog }));
export const setProgress = createAction(UPDATE_PROGRESS);
export const dismissUpdate = createAction(UPDATE_DISMISS);
