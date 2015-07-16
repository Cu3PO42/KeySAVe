/// <reference path="../../../bower_components/polymer-ts/polymer-ts.ts"/>
/// <reference path="../../../typings/github-electron/github-electron.d.ts"/>
import IpcClient = require("electron-ipc-tunnel/client");

(() => {
@component("save-dumper")
class SaveDumper extends polymer.Base {
    ipcClient: IpcClient;

    constructor() {
        super();
        this.ipcClient = new IpcClient();

        this.ipcClient.on("dump-save-result", (res) => {
            this.$.results.pokemon = res;
        });
    }

    dump() {
        this.ipcClient.send("dump-save", this.$.input.path);
    }
}
createElement(SaveDumper);
})()
