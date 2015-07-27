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
    team = "my-team";

    @property({type: String})
    formatString: string;

    ipcClient: IpcClient;
    opened = false;

    constructor() {
        super()
        this.ipcClient = new IpcClient();

        this.ipcClient.on("dump-bv-opened", (res) => {
            this.enemyDumpable = res.enemyDumpable;
            console.log(res);
            this.opened = true;
        });

        this.ipcClient.on("dump-bv-dumped", (res) => {
            this.$.results.pokemon = res;
        });
    }

    dump() {
        if (this.opened)
            this.ipcClient.send("dump-bv-dump", this.enemyDumpable && this.team === "enemy-team");
    }

    @observe("path")
    pathChanged(newValue, oldValue) {
        if (newValue !== "" && newValue !== undefined)
            fs.stat(newValue, (err, stats) => {
                if (err !== null || stats.size !== 28256) {
                    this.path = oldValue;
                    this.$.dialog.toggle();
                } else {
                    this.ipcClient.send("dump-bv-open", this.path);
                }
            });
    }

    not(val) {
        return !val;
    }
}
createElement(BvDumper);
})()
