import updater from 'electron-gh-releases-updater';
import logger, { registerIpc } from '../logger';
import pkgJson from '../../package.json';

var update;

export default function () {
  registerIpc('update-query', async () => {
    update = await updater(pkgJson);
    if (update.updateAvailable) {
      logger.info(`Update to ${update.changelog[0].name} available`);
      return { available: true, changelog: update.changelog };
    }

    logger.info('No update available');
    return { available: false };
  });

  registerIpc('update-do', async (reply) => {
    if (!update || !update.updateAvailable) {
      throw new Error('No update avaiable.');
    }
    update.update((progress) => {
      logger.info('Update started');
      reply('update-progress', progress);
    });
  });
}
