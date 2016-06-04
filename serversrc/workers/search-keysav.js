import * as fs from 'fs-extra';
import { join } from 'path';
import logger from './logger';

async function search(path, depth, callback) {
  try {
    await fs.readdirAsync(path).map(async (path2) => {
      var compoundPath = join(path, path2);
      if (depth > 0 && (await fs.statAsync(compoundPath)).isDirectory()) {
        await search(compoundPath, depth - 1, callback);
      } else if (path2 === 'KeySAV2.exe') {
        logger.verbose(`Found a KeySAV2 installation at ${path}`);
        callback({ path });
      }
    });
  } catch (e) { /* ignore */ }
}

process.on('message', async function handleMessage(m) {
  logger.info('Started a searching process');
  logger.verbose(`Searching for KeySAV2 installations in ${m.path} up to ${m.depth} folders deep`);
  await search(m.path, m.depth, process.send.bind(process));
  process.exit();
});
