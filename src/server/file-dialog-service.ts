import electron = require("electron");
const dialog = electron.dialog;
import registerIpc from "electron-ipc-tunnel/server";

export = function(window: GitHubElectron.BrowserWindow) {
    var counter = 1;

    registerIpc("file-dialog-open", function(arg_) {
        var arg = arg_ || {};
        return new Promise(function(resolve, reject) { 
            dialog.showOpenDialog(window, arg.options, function(filenames) {
                resolve(filenames);
            });
        });
    });

    registerIpc("file-dialog-save", function(reply, arg_) {
        var arg = arg_ || {};
        return new Promise(function(resolve, reject) { 
            dialog.showSaveDialog(window, arg.options, function(filenames) {
                resolve(filenames);
            });
        });
    });
}
