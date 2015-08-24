/// <reference path="../../../bower_components/polymer-ts/polymer-ts.ts"/>
/// <reference path="../../../typings/node/node.d.ts"/>
import IpcClient = require("electron-ipc-tunnel/client");
import fs = require("fs");
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

        this.fileOptions = process.platform === "win32" ? {} : {filters: [{name: "Battle Video", extensions: [""]}]};

        this.ipcClient = new IpcClient();

        this.ipcClient.on("dump-bv-dumped", (res) => {
            this.enemyDumpable = res.enemyDumpable;
            this.myTeam = res.myTeam;
            if (res.enemyDumpable) {
                this.enemyTeam = res.enemyTeam;
            } else {
                this.enemyTeam = [];
                this.team = "myTeam";
            }
            this.$.results.pokemon = this[this.team];
        });

        this.ipcClient.on("dump-bv-nokey", () => {
            this.path = "";
            this.dialogMessage = "You have to break for this video first!";
            this.$.dialog.toggle();
        });
    }

    @observe("path")
    pathChanged(newValue, oldValue) {
        if (newValue !== "" && newValue !== undefined)
            fs.stat(newValue, (err, stats) => {
                if (err !== null || stats.size !== 28256) {
                    this.path = oldValue;
                    this.dialogMessage = "Sorry, but this is not a valid battle video!";
                    this.$.dialog.toggle();
                } else {
                    this.ipcClient.send("dump-bv", this.path);
                }
            });
    }

    @observe("team")
    teamChanged(newValue, oldValue) {
        this.$.results.pokemon = this[newValue];
    }

    not(val) {
        return !val;
    }

    backup() {
        if (this.path)
            fs.createReadStream(this.path).pipe(<NodeJS.WritableStream>fs.createWriteStream(path.join(backupDirectory, path.basename(this.path))).on("error", () => {
                this.dialogMessage = "Couldn't backup battle video."
                this.$.dialog.toggle();
            }))
            .on("error", () => {
                this.dialogMessage = "Couldn't backup battle video."
                this.$.dialog.toggle();
            })
            .on("finish", () => {
                this.dialogMessage = "Battle video backupped!"
                this.$.dialog.toggle();
            });
    }
}
polymer.createElement(BvDumper);
})()
