/// <reference path="../../bower_components/polymer-ts/polymer-ts.ts"/>
/// <reference path="../../../typings/lodash/lodash.d.ts"/>
import IpcClient = require("electron-ipc-tunnel/client");
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

    attached() {
        this.ipcClient = new IpcClient();

        this.ipcClient.on("update-available", (changelog: {tag: string, name: string, body: string}[]) => {
            this.changelog = _.map(changelog, (e) => "# " + e.name + "\n\n" + e.body);
            // ugly hack. try to detect actual rendering
            setTimeout(() => this.$.dialog.toggle(), 1000);
        });

        this.ipcClient.on("update-progress", (progress) => {
            this.updateProgress = progress.percentage * 100;
        });

        this.ipcClient.send("update-query");
    }

    update() {
        this.ipcClient.send("update-do");
        this.updateInProgress = true;
        this.async(() => this.$.dialog.refit());
    }

    not(e) {
        return !e;
    }
}
polymer.createElement(ElectronUpdater);
})();
