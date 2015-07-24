/// <reference path="../../../bower_components/polymer-ts/polymer-ts.ts"/>
/// <reference path="../../../typings/github-electron/github-electron.d.ts"/>
import IpcClient = require("electron-ipc-tunnel/client");

(() => {
@component("save-dumper")
class SaveDumper extends polymer.Base {
    @property({type: Number})
    lowerBox: number = 1;

    @property({type: Number})
    upperBox: number = 31;

    ipcClient: IpcClient;

    constructor() {
        super();
        this.ipcClient = new IpcClient();

        this.ipcClient.on("dump-save-result", (res) => {
            this.$.results.pokemon = res;
        });
    }

    dump() {
        this.ipcClient.send("dump-save", {path: this.$.input.path, lower: this.lowerBox, upper: this.upperBox});
    }
}
createElement(SaveDumper);
})()
