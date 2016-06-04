import { app } from 'electron';
import { fork } from 'child_process';
import Promise from 'bluebird';
import { mergeKeyFolder } from './dumper';
import * as fs from 'fs-extra';
import logger, { registerIpc } from '../logger';

registerIpc('import-keysav2-folder', async function importKeySAV2Folder(reply, folder) {
  const files = await fs.readdirAsync(folder);
  let normalizedFolder;
  if (files.includes('KeySAV2.exe') && files.includes('data') && !(await fs.statAsync(folder + '/data')).isFile()) {
    normalizedFolder = folder + '/data';
  } else {
    normalizedFolder = folder;
  }
  await mergeKeyFolder(normalizedFolder);
});

registerIpc('search-keysav2', function searchKeySAV2() {
  const promises = [];
  const folders = [];
  return new Promise((resolve) => {
    const searcher = fork(__dirname + '/../workers/bootstrap.js', [__dirname + '/../workers/search-keysav']);
    searcher.send({ path: app.getPath('home'), depth: 5 });
    searcher.on('message', async (res) => {
      if (res.log !== undefined) {
        logger.log(res.log, ...res.args);
        return;
      }
      const { path } = res;
      promises.push(mergeKeyFolder(path + '/data').catch(() => {}));
      folders.push(path);
    });
    searcher.on('close', async () => {
      await Promise.all(promises);
      resolve(folders);
    });
  });
});
