/// <reference path="../typings/github-electron/github-electron.d.ts" />
var updater = require("electron-gh-releases-updater");
var app = require("app");
var ipcServer = require("electron-ipc-tunnel/server");
var child_process = require("child_process");
var path = require("path");
module.exports = function () {
    ipcServer.on("update-query", function (reply) {
        updater(require("../package.json"), function (err, res) {
            if (res.updateAvailable) {
                ipcServer.on("update-do", function () {
                    res.update(path.normalize(path.join(__dirname, "..")), function (e) {
                        if (e) {
                            console.log("Didn't update.");
                            console.log(e);
                            return;
                        }
                        child_process.exec(process.execPath);
                        app.quit();
                    });
                });
                reply("update-available");
            }
            else {
                console.log("no update available");
            }
        });
    });
};
