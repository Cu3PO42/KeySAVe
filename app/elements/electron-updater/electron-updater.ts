/// <reference path="../../../bower_components/polymer-ts/polymer-ts.ts"/>
import IpcClient = require("electron-ipc-tunnel/client");
(() => {
@component("electron-updater")
class ElectronUpdater extends polymer.Base {
    @property({type: Boolean})
    updateInProgress: boolean;

    ipcClient: IpcClient;

    attached() {
        this.ipcClient = new IpcClient();

        this.ipcClient.on("update-available", () => {
            this.$.dialog.toggle();
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
