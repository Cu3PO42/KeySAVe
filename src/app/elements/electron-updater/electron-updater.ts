/// <reference path="../../bower_components/polymer-ts/polymer-ts.ts"/>
/// <reference path="../../../typings/lodash/lodash.d.ts"/>

"use strict";

import IpcClient from "electron-ipc-tunnel/client";
import _ = require("lodash");
(() => {
@component("electron-updater")
class ElectronUpdater extends polymer.Base {
    @property({type: Boolean})
    updateInProgress: boolean = false;

    @property({type: Number})
    updateProgress: number = 0;

    @property({type: Array})
    changelog: string[];

    ipcClient: IpcClient;

    async attached() {
        this.ipcClient = new IpcClient();

        /*this.ipcClient.on("update-progress", (progress) => {
            this.updateProgress = progress.percentage * 100;
        });*/

        var res: {
            available: boolean,
            changelog: {name: string, body: string, tag: string}[]
        } = await this.ipcClient.send("update-query");
        if (res.available) {
            this.changelog = _.map(res.changelog, (e) => "# " + e.name + "\n\n" + e.body);
            setTimeout(() => this.$.dialog.toggle(), 1000);
        }
    }

    update() {
        this.updateInProgress = true;
        this.async(() => this.$.dialog.refit());
        this.ipcClient.send("update-do");
    }

    not(e) {
        return !e;
    }
}
ElectronUpdater.register();
})();
