/// <reference path="../../bower_components/polymer-ts/polymer-ts.ts"/>
/// <reference path="../../../typings/github-electron/github-electron.d.ts"/>

import IpcClient from "electron-ipc-tunnel/client";
(() => {
@component("file-input")
class FileInput extends polymer.Base {
    @property({type: String, reflectToAttribute: true, notify: true})
    path: string;

    @property({type: String, reflectToAttribute: true})
    buttonText: string;

    @property({type: Object})
    options: any;

    ipcClient: IpcClient;

    constructor() {
        super();
        this.ipcClient = new IpcClient();

        if (this.buttonText === undefined)
            this.buttonText = "Choose file";
    }

    openDialog() {
        setTimeout(async () => {
            var reply = await this.ipcClient.send("file-dialog-open", {options: this.options});
            if (reply !== undefined) {
                this.path = reply[0];
            }
        }, 350);
    }
}
FileInput.register();
})()
