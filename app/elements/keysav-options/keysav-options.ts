/// <reference path="../../../bower_components/polymer-ts/polymer-ts.ts"/>
/// <reference path="../../../typings/github-electron/github-electron.d.ts" />
import IpcClient = require("electron-ipc-tunnel/client");

(() => {
@component("keysav-options")
class KeysavOptions extends polymer.Base {
    @property({type: String})
    file1: string;

    @property({type: String})
    file2: string;

    @property({type: Array})
    breakMessage: string[];

    ipcClient: IpcClient;
    breakResult;

    constructor() {
        super();
        this.ipcClient = new IpcClient();

        this.ipcClient.on("break-key-result", (arg) => {
            this.breakMessage = arg.result.match(/^.+$/gm);
            this.breakResult = arg;
            this.$.dialog.toggle();
        });

        this.ipcClient.on("file-dialog-save-result", (arg) => {
            if (arg)
            {
                this.ipcClient.send("break-key-store", {path: arg});
            }
            else {
                this.ipcClient.send("break-key-cancel");
            }
        });
    }

    break() {
        this.ipcClient.send("break-key", {file1: this.file1, file2: this.file2});
    }

    saveBreak() {
        if (this.breakResult.success) {
            this.ipcClient.send("file-dialog-save", <{options: GitHubElectron.Dialog.OpenDialogOptions}>{options: {defaultPath: process.cwd() + "/data/" + this.breakResult.path, extensions: ["bin"]}});
        } else {
            this.ipcClient.send("break-key-cancel");
        }
    }

    cancelBreak() {
        this.ipcClient.send("break-key-cancel");
    }
}
createElement(KeysavOptions);
})()
