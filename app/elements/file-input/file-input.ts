/// <reference path="../../../bower_components/polymer-ts/polymer-ts.ts"/>
/// <reference path="../../../typings/github-electron/github-electron.d.ts"/>

import IpcClient = require("electron-ipc-tunnel/client");
(() => {
@component("file-input")
class FileInput extends polymer.Base {
    @property({type: String, reflectToAttribute: true, notify: true})
    path: string;

    @property({type: String, reflectToAttribute: true})
    buttonText: string;

    ipcClient: IpcClient;

    constructor() {
        super();
        this.ipcClient = new IpcClient();

        this.ipcClient.on("file-dialog-open-result", (reply) => {
            if (reply !== undefined)
                this.path = reply[0];
        });

        if (this.buttonText === undefined)
            this.buttonText = "Choose file";
    }

    openDialog() {
        setTimeout(() => this.ipcClient.send("file-dialog-open"), 350);
    }
}
createElement(FileInput);
})()
