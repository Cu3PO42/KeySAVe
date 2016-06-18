import { remote } from 'electron';

const logger = remote.require('../serverlib/logger').default;

export default logger;
