import updater from 'electron-gh-releases-updater';
import { registerIpc } from '../logger';
import pkgJson from '../../package.json';

var update;

export default function () {
  registerIpc('update-query', async () => {
    update = await updater(pkgJson);
    if (update.updateAvailable) {
      return { available: true, changelog: update.changelog };
    }

    return { available: false };
  });

  registerIpc('update-do', async (reply) => {
    if (!update || !update.updateAvailable) {
      throw new Error('No update avaiable.');
    }
    update.update((progress) => {
      reply('update-progress', progress);
    });
  });
}
