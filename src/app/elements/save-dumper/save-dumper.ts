/// <reference path="../../../typings/github-electron/github-electron.d.ts"/>
/// <reference path="../../../typings/node/node.d.ts"/>
/// <reference path="../../../typings/fs-extra/fs-extra.d.ts"/>

import IpcClient from "electron-ipc-tunnel/client";
import { PolymerElement, component, property, observe, computed } from "polymer-decorators";
import fse = require("fs-extra");
import path = require("path-extra");

(() => {
function mkdirOptional(path) {
    if (!fse.existsSync(path))
        fse.mkdirSync(path);
}

var backupDirectory = path.join(path.homedir(), "Documents", "KeySAVe", "backup");
mkdirOptional(path.join(path.homedir(), "Documents", "KeySAVe"));
mkdirOptional(backupDirectory);

@component("save-dumper")
class SaveDumper extends PolymerElement {
    @property({type: Number})
    lowerBox: number;

    @property({type: Number})
    upperBox: number;

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
    isNewKey: boolean;

    ipcClient: IpcClient;

    attached() {
        this.lowerBox = 1;
        this.upperBox = 31;
        this.isNewKey = true;

        this.fileOptions = process.platform !== "darwin" ? {} : {filters: [{name: "SAV (1MB)", extensions: ["bin", "sav"]}, {name: "Main File", extensions: [""]}]};

        this.ipcClient = new IpcClient();
    }

    @observe("path")
    async pathChange(newPath, oldPath) {
        if (newPath === "" || newPath === undefined)
            return;
        var stats = await fse.statAsync(newPath);
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
            await fse.copyAsync(this.path, path.join(backupDirectory, path.basename(this.path)));
            this.dialogMessage = "Save backupped!"
            this.$.dialog.toggle();
        } catch (e) {
            this.dialogMessage = "Couldn't backup save."
            this.$.dialog.toggle();
        }
    }

    @computed()
    testing() { return 1; }
}
Polymer(SaveDumper);
})()
