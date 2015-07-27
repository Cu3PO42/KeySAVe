/// <reference path="../../../bower_components/polymer-ts/polymer-ts.ts"/>
/// <reference path="../../../typings/github-electron/github-electron.d.ts"/>
/// <reference path="../../../typings/node/node.d.ts"/>
import IpcClient = require("electron-ipc-tunnel/client");
import fs = require("fs");

(() => {
@component("save-dumper")
class SaveDumper extends polymer.Base {
    @property({type: Number})
    lowerBox: number = 1;

    @property({type: Number})
    upperBox: number = 31;

    @property({type: String})
    path: string;

    @property({type: String})
    formatString: string;

    ipcClient: IpcClient;
    opened = false;

    constructor() {
        super();
        this.ipcClient = new IpcClient();

        this.ipcClient.on("dump-save-opened", (res) => {
            this.opened = true;
        });

        this.ipcClient.on("dump-save-dumped", (res) => {
            this.$.results.pokemon = res;
        });
    }

    dump() {
        if (this.opened)
            this.ipcClient.send("dump-save-dump", {lower: this.lowerBox, upper: this.upperBox});
    }

    @observe("path")
    pathChange(newPath, oldPath) {
        if (newPath !== "" && newPath !== undefined)
            fs.stat(newPath, (err, stats) => {
                if (err) {
                    this.path = oldPath;
                    this.$.dialog.toggle();
                } else switch (stats.size) {
                    case 0x100000:
                    case 0x10009C:
                    case 0x10019A:
                    case 0x76000:
                    case 0x65600:
                        this.ipcClient.send("dump-save-open", this.path);
                        break;
                    default:
                        this.path = oldPath;
                        this.$.dialog.toggle();
                        break;
                }
            });
    }
}
createElement(SaveDumper);
})()
