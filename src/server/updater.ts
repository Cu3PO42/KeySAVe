/// <reference path="../typings/github-electron/github-electron.d.ts" />

import updater from "electron-gh-releases-updater";
import { app } from "electron";
import * as child_process from "child_process";

var prevCwd = process.cwd();

var update;

import registerIpc from "electron-ipc-tunnel/server";

export default function() {
    registerIpc("update-query", async () => {
        update = await updater(require("../package.json"));
        if (update.updateAvailable) {
            return { available: true, changelog: update.changelog };
        } else {
            return { available: false };
        }
    });

    registerIpc("update-do", async (reply) => {
        if (!update || !update.updateAvailable)
            throw new Error("No update avaiable.");
        update.update((progress) => {
            reply("update-progress", progress);
        });
    });
};
