"use strict";
var updater = require("electron-gh-releases-updater");
var electron = require("electron");
var app = electron.app;
var ipcServer = require("electron-ipc-tunnel/server");
var child_process = require("child_process");
var fs = require("fs");
var path = require("path");
var prevCwd = process.cwd();
module.exports = function () {
    ipcServer.on("update-query", function (reply) {
        updater(require("../package.json"), function (err, res) {
            if (err === null && res.updateAvailable) {
                ipcServer.on("update-do", function () {
                    res.update(function (e) {
                        if (e) {
                            return;
                        }
                        fs.writeFileSync(path.join(__dirname, "../UPDATED"), require("../package.json").version, { encoding: "utf-8" });
                        child_process.exec(process.execPath, { cwd: prevCwd });
                        app.quit();
                    });
                });
                reply("update-available", res.changelog);
            }
        }, function (progress) {
            reply("update-progress", progress);
        });
    });
};
