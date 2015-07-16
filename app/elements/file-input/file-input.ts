/// <reference path="../../../bower_components/polymer-ts/polymer-ts.ts"/>
/// <reference path="../../../typings/github-electron/github-electron.d.ts"/>

import IpcClient = require("electron-ipc-tunnel/client");
(() => {
@component("file-input")
class FileInput extends polymer.Base {
    @property({type: String, reflectToAttribute: true})
    path: string;

    ipcClient: IpcClient;

    constructor() {
        super();
        this.ipcClient = new IpcClient();

        this.ipcClient.on("file-dialog-open-result", (reply) => {
            this.path = reply[0];
        });
    }

    openDialog() {
        setTimeout(() => this.ipcClient.send("file-dialog-open"), 350);
    }
}
createElement(FileInput);
})()
