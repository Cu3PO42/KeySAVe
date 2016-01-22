/// <reference path="../../bower_components/polymer-ts/polymer-ts.ts"/>
/// <reference path="../../../typings/github-electron/github-electron.d.ts"/>
/// <reference path="../../../typings/node/node.d.ts"/>
/// <reference path="../../../typings/fs-extra/fs-extra.d.ts"/>

import IpcClient from "electron-ipc-tunnel/client";
import fs = require("fs-extra");
import path = require("path-extra");

(() => {
function mkdirOptional(path) {
    if (!fs.existsSync(path))
        fs.mkdirSync(path);
}

var backupDirectory = path.join(path.homedir(), "Documents", "KeySAVe", "backup");
mkdirOptional(path.join(path.homedir(), "Documents", "KeySAVe"));
mkdirOptional(backupDirectory);

@component("save-dumper")
class SaveDumper extends polymer.Base {
    @property({type: Number})
    lowerBox: number = 1;

    @property({type: Number})
    upperBox: number = 31;

    @property({type: String})
    path: string;

    @property({type: Object})
    format: any;

    @property({type: String})
    language: string;

    @property({type: Object})
    fileOptions: GitHubElectron.Dialog.OpenDialogOptions;

    @property({type: String})
    dialogMessage: string;

    @property({type: Boolean})
    isNewKey: boolean = true;

    ipcClient: IpcClient;

    constructor() {
        super();

        this.fileOptions = process.platform !== "darwin" ? {} : {filters: [{name: "SAV (1MB)", extensions: ["bin", "sav"]}, {name: "Main File", extensions: [""]}]};

        this.ipcClient = new IpcClient();
    }

    @observe("path")
    async pathChange(newPath, oldPath) {
        if (newPath === "" || newPath === undefined)
            return;
        var stats = await fs.statAsync(newPath);
        switch (stats.size) {
            case 0x100000:
            case 0x10009C:
            case 0x10019A:
            case 0x76000:
            case 0x65600:
            case 232*30*32:
            case 232*30*31:
            case 0x70000:
            case 0x80000:
                try {
                    var res = await this.ipcClient.send("dump-save", this.path);
                    this.isNewKey = res.isNewKey;
                    this.$.results.pokemon = res.pokemon;
                } catch (e) {
                    this.path = "";
                    this.dialogMessage = "You have to break for this save first!";
                    this.$.dialog.toggle();
                }
                break;
            default:
                this.path = oldPath;
                this.dialogMessage = "Sorry, but this is not a valid save file!";
                this.$.dialog.toggle();
                break;
        }
    }

    async backup() {
        if (!this.path)
            return;
        try {
            await fs.copyAsync(this.path, path.join(backupDirectory, path.basename(this.path)));
            this.dialogMessage = "Save backupped!"
            this.$.dialog.toggle();
        } catch (e) {
            this.dialogMessage = "Couldn't backup save."
            this.$.dialog.toggle();
        }
    }
}
SaveDumper.register();
})()
