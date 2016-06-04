import { Logger, transports } from 'winston';
import { getPath } from 'electron';
import registerIpc from 'electron-ipc-tunnel/server';

const file = process.env.NODE_ENV === 'development' ? './keysave.log' : `${getPath('appData')}/keysave.log`;

const logger = new Logger({
  transports: [
    new transports.File({ filename: file }),
    new transports.Console()
  ]
});

export default logger;

export function registerIpc(name, handler) {
  logger.debug(`IPC Handler for ${name} registered`);
  registerIpc(name, handler);
}
