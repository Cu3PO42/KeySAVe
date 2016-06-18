import { Logger, transports } from 'winston';
import { app } from 'electron';
import registerIpcOrg from 'electron-ipc-tunnel/server';

const file = process.env.NODE_ENV === 'development' ? './keysave.log' : `${app.getPath('appData')}/keysave.log`;

const logger = new Logger({
  transports: [
    new transports.File({ filename: file, level: 'debug' }),
    new transports.Console({ level: process.env.NODE_ENV === 'development' ? 'debug' : 'info' })
  ]
});

export default logger;

export function registerIpc(name, handler) {
  logger.debug(`IPC Handler for ${name} registered`);
  registerIpcOrg(name, handler);
}
