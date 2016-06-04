import { dialog } from 'electron';
import { registerIpc } from '../logger';
import Promise from 'bluebird';

export default function (window) {
  registerIpc('file-dialog-open', function fileDialogOpen(reply, arg_) {
    var arg = arg_ || {};
    return new Promise((resolve) => {
      dialog.showOpenDialog(window, arg.options, resolve);
    });
  });

  registerIpc('file-dialog-save', function fileDialogSave(reply, arg_) {
    var arg = arg_ || {};
    return new Promise((resolve) => {
      dialog.showSaveDialog(window, arg.options, resolve);
    });
  });
}
