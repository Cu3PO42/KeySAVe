/// <reference path="../../bower_components/polymer-ts/polymer-ts.ts"/>
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

@component("bv-dumper")
class BvDumper extends polymer.Base {
    @property({type: String})
    path: string;

    @property({type: Boolean})
    enemyDumpable = false;

    @property({type: String})
    team = "myTeam";

    @property({type: Object})
    format: any;

    @property({type: String})
    language: string;

    @property({type: Object})
    fileOptions: GitHubElectron.Dialog.OpenDialogOptions;

    @property({type: String})
    dialogMessage: string;

    ipcClient: IpcClient;
    myTeam: any[];
    enemyTeam: any[];

    constructor() {
        super()

        this.fileOptions = process.platform !== "darwin" ? {} : {filters: [{name: "Battle Video", extensions: [""]}]};

        this.ipcClient = new IpcClient();
    }

    @observe("path")
    async pathChanged(newValue, oldValue) {
        if (newValue === "" || newValue === undefined)
            return;
        var stats = await fs.statAsync(newValue);
        if (stats.size !== 28256) {
            this.path = oldValue;
            this.dialogMessage = "Sorry, but this is not a valid battle video!";
            this.$.dialog.toggle();
        } else {
            try {
                var res = await this.ipcClient.send("dump-bv", this.path);
                this.enemyDumpable = res.enemyDumpable;
                this.myTeam = res.myTeam;
                if (res.enemyDumpable) {
                    this.enemyTeam = res.enemyTeam;
                } else {
                    this.enemyTeam = [];
                    this.team = "myTeam";
                }
                this.$.results.pokemon = this[this.team];
            } catch (e) {
                this.path = "";
                this.dialogMessage = "You have to break for this video first!";
                this.$.dialog.toggle();
            }
        }
    }

    @observe("team")
    teamChanged(newValue, oldValue) {
        this.$.results.pokemon = this[newValue];
    }

    not(val) {
        return !val;
    }

    async backup() {
        if (!this.path)
            return;
        try {
            await fs.copyAsync(this.path, path.join(backupDirectory, path.basename(this.path)));
            this.dialogMessage = "Battle video backupped!"
            this.$.dialog.toggle();
        } catch (e) {
            this.dialogMessage = "Couldn't backup battle video."
            this.$.dialog.toggle();
        }
    }
}
BvDumper.register();
})()
