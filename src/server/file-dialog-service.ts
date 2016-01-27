import { dialog } from "electron";
import registerIpc from "electron-ipc-tunnel/server";
import * as Promise from "bluebird";

export default function(window: GitHubElectron.BrowserWindow) {
    var counter = 1;

    registerIpc("file-dialog-open", function(reply, arg_) {
        var arg = arg_ || {};
        return new Promise(function(resolve, reject) {
            dialog.showOpenDialog(window, arg.options, resolve);
        });
    });

    registerIpc("file-dialog-save", function(reply, arg_) {
        var arg = arg_ || {};
        return new Promise(function(resolve, reject) {
            dialog.showSaveDialog(window, arg.options, resolve);
        });
    });
}
