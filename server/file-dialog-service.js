var ipcServer = require("electron-ipc-tunnel/server");
var dialog = require("dialog");
module.exports = function (window) {
    var counter = 1;
    ipcServer.on("file-dialog-open", function (reply, arg_) {
        var arg = arg_ || {};
        dialog.showOpenDialog(window, arg.options, function (filenames) {
            reply("file-dialog-open-result", filenames);
        });
    });
    ipcServer.on("file-dialog-save", function (reply, arg_) {
        var arg = arg_ || {};
        dialog.showSaveDialog(window, arg.options, function (filename) {
            reply("file-dialog-save-result", filename);
        });
    });
};
