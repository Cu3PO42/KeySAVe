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

    @property({type: Object})
    format: any;

    @property({type: Object})
    fileOptions: GitHubElectron.Dialog.OpenDialogOptions;

    ipcClient: IpcClient;

    constructor() {
        super();

        this.fileOptions = {filters: [{name: "SAV (1MB)", extensions: ["bin", "sav"]}, {name: "Main File", extensions: [""]}]}

        this.ipcClient = new IpcClient();

        this.ipcClient.on("dump-save-dumped", (res) => {
            this.$.results.pokemon = res;
        });

        this.ipcClient.on("dump-save-nokey", () => {
            this.path = "";
            this.$.dialogNokey.toggle();
        });
    }

    @observe("path")
    pathChange(newPath, oldPath) {
        if (newPath !== "" && newPath !== undefined)
            fs.stat(newPath, (err, stats) => {
                if (err) {
                    this.path = oldPath;
                    this.$.dialogInvalid.toggle();
                } else switch (stats.size) {
                    case 0x100000:
                    case 0x10009C:
                    case 0x10019A:
                    case 0x76000:
                    case 0x65600:
                        this.ipcClient.send("dump-save", this.path);
                        break;
                    default:
                        this.path = oldPath;
                        this.$.dialogInvalid.toggle();
                        break;
                }
            });
    }
}
polymer.createElement(SaveDumper);
})()
