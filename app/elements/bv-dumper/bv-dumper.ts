/// <reference path="../../../bower_components/polymer-ts/polymer-ts.ts"/>
import IpcClient = require("electron-ipc-tunnel/client");

(() => {
@component("bv-dumper")
class BvDumper extends polymer.Base {
    ipcClient: IpcClient;

    constructor() {
        super()
        this.ipcClient = new IpcClient();

        this.ipcClient.on("dump-bv-result", (res) => {
            this.$.results.pokemon = res;
        });
    }

    dump() {
        this.ipcClient.send("dump-bv", {path: this.$.input.path});
    }
}
createElement(BvDumper);
})()
