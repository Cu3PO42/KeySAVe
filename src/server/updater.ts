/// <reference path="../typings/github-electron/github-electron.d.ts" />

import updater = require("electron-gh-releases-updater");
import electron = require("electron");
const app = electron.app;
import child_process = require("child_process");
import fs = require("fs");
import path = require("path");
var prevCwd = process.cwd();

import registerIpc from "electron-ipc-tunnel/server";

export = function() {};
/*export = () => {
    registerIpc("update-query", () => {
        return new Promise((resolve, reject) => {
            updater(require("../package.json"), (err, res) => {
                if (err === null && res.updateAvailable) {
                    registerIpc("update-do", async () => {
                        res.update((e) => {
                            if (e) {
                                //console.log("Didn't update.");
                                //console.log(e);
                                return;
                            }
                            fs.writeFileSync(path.join(__dirname, "../UPDATED"), require("../package.json").version, { encoding: "utf-8" });
                            child_process.exec(process.execPath, { cwd: prevCwd });
                            app.quit();
                        });
                    });
                    resolve({ available: true, changelog: res.changelog });
                }
            }, (progress) => {
            reply("update-progress", progress);
            });
        });
    });
};
*/
