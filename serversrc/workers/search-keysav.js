import * as fs from 'fs-extra';
import { join } from 'path';

async function search(path, depth, callback) {
  try {
    await fs.readdirAsync(path).map(async (path2) => {
      var compoundPath = join(path, path2);
      if (depth > 0 && (await fs.statAsync(compoundPath)).isDirectory()) {
        await search(compoundPath, depth - 1, callback);
      } else if (path2 === 'KeySAV2.exe') {
        callback(path);
      }
    });
  } catch (e) { /* ignore */ }
}

process.on('message', async function handleMessage(m) {
  await search(m.path, m.depth, process.send.bind(process));
  process.exit();
});
