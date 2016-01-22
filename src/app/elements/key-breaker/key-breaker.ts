/// <reference path="../../bower_components/polymer-ts/polymer-ts.ts"/>

import IpcClient = require("electron-ipc-tunnel/client");
import fs = require("fs");

(() => {
@component("key-breaker")
class KeyBreaker extends polymer.Base {
    @property({type: String})
    file1: string;

    @property({type: String})
    file2: string;

    @property({type: Array})
    breakMessage: string[];

    @property({type: Object})
    fileOptions: GitHubElectron.Dialog.OpenDialogOptions;

    @property({type: Object})
    folderOptions: GitHubElectron.Dialog.OpenDialogOptions;

    ipcClient: IpcClient;
    breakResult;

    file1Type: string;
    file2Type: string;

    constructor() {
        super();

        this.fileOptions = process.platform !== "darwin" ? {} : {filters: [{name: "SAV (1MB)", extensions: ["bin", "sav"]}, {name: "Battle Video", extensions: [""]}]};
        this.folderOptions = {properties: ["openDirectory"]};

        this.ipcClient = new IpcClient();

        this.ipcClient.on("break-key-result", (arg) => {
            this.breakMessage = arg.result.match(/^.*$/gm);
            this.breakResult = arg;
            this.$.dialogBreakDone.toggle();
        });

        this.ipcClient.on("file-dialog-save-result", (arg) => {
            if (arg) {
                this.ipcClient.send("break-key-store", {path: arg});
            } else {
                this.ipcClient.send("break-key-cancel");
            }
        });

        this.ipcClient.on("break-folder-result", () => {
            this.$.dialogBreakingFolder.toggle();
        });
    }

    break() {
        if (this.file1Type === this.file2Type && this.file1Type !== undefined)
            this.ipcClient.send("break-key", {file1: this.file1, file2: this.file2});
        else
            this.$.dialogBreakNotSameFiles.toggle();
    }

    saveBreak() {
        if (this.breakResult.success) {
            if (this.breakResult.path !== "")
                this.ipcClient.send("file-dialog-save", <{options: GitHubElectron.Dialog.OpenDialogOptions}>{options: {defaultPath: this.breakResult.path, filters: [{name: "Key file", extensions: ["bin"]}]}});
        } else {
            this.ipcClient.send("break-key-cancel");
        }
    }

    cancelBreak() {
        this.ipcClient.send("break-key-cancel");
    }

    updateFileBase(name: string, oldValue: string) {
        if (this[name] !== undefined && this[name] !== "")
            fs.stat(this[name], (err, res) => {
                if (err) {
                    this[name] = oldValue;
                    this.$.dialogFileInvalid.toggle();
                } else
                    switch (res.size) {
                        case 0x100000:
                        case 0x10009C:
                        case 0x10019A:
                            this[name+"Type"] = "sav";
                            break;
                        case 28256:
                            this[name+"Type"] = "bv";
                            break;
                        default:
                            this[name] = oldValue;
                            this.$.dialogFileInvalid.toggle();
                            break;
                    }
            })
    }

    @observe("file1")
    file1Changed(newValue, oldValue) {
        this.updateFileBase("file1", oldValue);
    }

    @observe("file2")
    file2Changed(newValue, oldValue) {
        this.updateFileBase("file2", oldValue);
    }

    @observe("folder")
    folderChanged(newValue, oldValue) {
        if (this.ipcClient !== undefined) {
            this.ipcClient.send("break-folder", newValue);
            this.$.dialogBreakingFolder.toggle();
        }
    }
}
KeyBreaker.register();
})();
