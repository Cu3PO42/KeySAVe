/// <reference path="../typings/github-electron/github-electron.d.ts" />

import updater = require("electron-gh-releases-updater");
import app = require("app");
import ipcServer = require("electron-ipc-tunnel/server");
import child_process = require("child_process");
import fs = require("fs");
import path = require("path");
var prevCwd = process.cwd();

export = () => {
    ipcServer.on("update-query", (reply) => {
        updater(require("../package.json"), (err, res) => {
            if (err === null && res.updateAvailable) {
                ipcServer.on("update-do", () => {
                    res.update((e) => {
                        if (e) {
                            //console.log("Didn't update.");
                            //console.log(e);
                            return;
                        }
                        fs.writeFileSync(path.join(__dirname, "../UPDATED"), require("../package.json").version, {encoding: "utf-8"});
                        child_process.exec(process.execPath, {cwd: prevCwd});
                        app.quit();
                    });
                });
                reply("update-available", res.changelog);
            }
        }, (progress) => {
            reply("update-progress", progress);
        });
    });
};
