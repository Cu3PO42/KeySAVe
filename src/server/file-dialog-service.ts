import ipcServer = require("electron-ipc-tunnel/server");
import electron = require("electron");
const dialog = electron.dialog;

export = function(window: GitHubElectron.BrowserWindow) {
    var counter = 1;

    ipcServer.on("file-dialog-open", function(reply, arg_) {
        var arg = arg_ || {};
        dialog.showOpenDialog(window, arg.options, function(filenames) {
            reply("file-dialog-open-result", filenames);
        });
    });

    ipcServer.on("file-dialog-save", function(reply, arg_) {
        var arg = arg_ || {};
        dialog.showSaveDialog(window, arg.options, function(filename) {
            reply("file-dialog-save-result", filename);
        });
    });
}
