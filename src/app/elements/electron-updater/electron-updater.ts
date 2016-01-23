/// <reference path="../../../typings/lodash/lodash.d.ts"/>

"use strict";

import IpcClient from "electron-ipc-tunnel/client";
import { PolymerElement, component, property, observe } from "polymer-decorators";
import _ = require("lodash");
(() => {
@component("electron-updater")
class ElectronUpdater extends PolymerElement {
    @property({type: Boolean})
    updateInProgress: boolean;

    @property({type: Number})
    updateProgress: number;

    @property({type: Array})
    changelog: string[];

    ipcClient: IpcClient;

    async attached() {
        this.updateInProgress = false;
        this.updateProgress = 0;
        this.ipcClient = new IpcClient();

        /*this.ipcClient.on("update-progress", (progress) => {
            this.updateProgress = progress.percentage * 100;
        });*/

        try {
        var res: {
            available: boolean,
            changelog: {name: string, body: string, tag: string}[]
        } = await this.ipcClient.send("update-query");
        if (res.available) {
            this.changelog = _.map(res.changelog, (e) => "# " + e.name + "\n\n" + e.body);
            setTimeout(() => this.$.dialog.toggle(), 1000);
        }
    } catch(e) {}
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
Polymer(ElectronUpdater);
})();
