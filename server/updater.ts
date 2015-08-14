/// <reference path="../typings/github-electron/github-electron.d.ts" />

import updater = require("electron-gh-releases-updater");
import app = require("app");
import ipcServer = require("electron-ipc-tunnel/server");
import child_process = require("child_process");
import path = require("path");

export = () => {
    ipcServer.on("update-query", (reply) => {
        updater(require("../package.json"), (err, res) => {
            if (err === null && res.updateAvailable) {
                ipcServer.on("update-do", () => {
                    res.update(path.normalize(path.join(__dirname, "..")), (e) => {
                        if (e) {
                            //console.log("Didn't update.");
                            //console.log(e);
                            return;
                        }
                        child_process.exec(process.execPath);
                        app.quit();
                    });
                });
                reply("update-available");
            }
        })
    });
};
