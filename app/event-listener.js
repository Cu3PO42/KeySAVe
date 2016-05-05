import { ipcRenderer } from 'electron';
import { send as ipcSend } from 'electron-ipc-tunnel/client';
import { openFile } from './actions/file';

export default function listenToEvents(store) {
  ipcRenderer.on('trigger-open-file', async () => {
    try {
      const [file] = await ipcSend('file-dialog-open', { options: {} });
      if (file !== undefined) {
        store.dispatch(openFile(file));
      }
    } catch (e) { /* ignore */ }
  });
}
