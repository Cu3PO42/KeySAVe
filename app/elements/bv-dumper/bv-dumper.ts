/// <reference path="../../../bower_components/polymer-ts/polymer-ts.ts"/>
/// <reference path="../../../typings/node/node.d.ts"/>
import IpcClient = require("electron-ipc-tunnel/client");
import fs = require("fs");

(() => {
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

    @property({type: Object})
    fileOptions: GitHubElectron.Dialog.OpenDialogOptions;

    ipcClient: IpcClient;
    myTeam: any[];
    enemyTeam: any[];

    constructor() {
        super()

        this.fileOptions = {filters: [{name: "Battle Video", extensions: [""]}]}

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
            this.$.dialogNokey.toggle();
        });
    }

    @observe("path")
    pathChanged(newValue, oldValue) {
        if (newValue !== "" && newValue !== undefined)
            fs.stat(newValue, (err, stats) => {
                if (err !== null || stats.size !== 28256) {
                    this.path = oldValue;
                    this.$.dialogInvalid.toggle();
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
}
polymer.createElement(BvDumper);
})()
