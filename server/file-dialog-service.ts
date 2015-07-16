import ipcServer = require("electron-ipc-tunnel/server");
import dialog = require("dialog");

export = function(window: GitHubElectron.BrowserWindow) {
    var counter = 1;

    ipcServer.on("file-dialog-open", function(reply, arg) {
        var arg = arg || {};
        dialog.showOpenDialog(window, arg.filters, function(filenames) {
            reply("file-dialog-open-result", filenames);
        })
    })
}
