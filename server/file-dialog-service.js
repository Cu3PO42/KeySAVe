"use strict";
var electron_1 = require("electron");
var server_1 = require("electron-ipc-tunnel/server");
var Promise = require("bluebird");
function default_1(window) {
    var counter = 1;
    server_1.default("file-dialog-open", function (reply, arg_) {
        var arg = arg_ || {};
        return new Promise(function (resolve, reject) {
            electron_1.dialog.showOpenDialog(window, arg.options, resolve);
        });
    });
    server_1.default("file-dialog-save", function (reply, arg_) {
        var arg = arg_ || {};
        return new Promise(function (resolve, reject) {
            electron_1.dialog.showSaveDialog(window, arg.options, resolve);
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
