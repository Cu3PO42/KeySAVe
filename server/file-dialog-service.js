var ipcServer = require("electron-ipc-tunnel/server");
var dialog = require("dialog");
module.exports = function (window) {
    var counter = 1;
    ipcServer.on("file-dialog-open", function (reply, arg) {
        var arg = arg || {};
        dialog.showOpenDialog(window, arg.filters, function (filenames) {
            reply("file-dialog-open-result", filenames);
        });
    });
};
