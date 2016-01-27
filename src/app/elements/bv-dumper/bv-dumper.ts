import IpcClient from "electron-ipc-tunnel/client";
import { PolymerElement, component, property, observe } from "polymer-decorators";
import * as fse from "fs-extra";
import * as path from "path-extra";

namespace BvDumper {
var backupDirectory = path.join(path.homedir(), "Documents", "KeySAVe", "backup");
fse.mkdirpSync(backupDirectory);

@component("bv-dumper")
class BvDumper extends PolymerElement {
    @property
    path: string;

    @property
    enemyDumpable: boolean;

    @property
    team: string;

    @property
    format: any;

    @property
    language: string;

    @property
    fileOptions: GitHubElectron.Dialog.OpenDialogOptions;

    @property
    dialogMessage: string;

    ipcClient: IpcClient;
    myTeam: any[];
    enemyTeam: any[];

    attached() {
        this.enemyDumpable = false;
        this.team = "myTeam";

        this.fileOptions = process.platform !== "darwin" ? {} : {filters: [{name: "Battle Video", extensions: [""]}]};

        this.ipcClient = new IpcClient();
    }

    @observe("path")
    async pathChanged(newValue, oldValue) {
        if (newValue === "" || newValue === undefined)
            return;
        var stats = await fse.statAsync(newValue);
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
            await fse.copyAsync(this.path, path.join(backupDirectory, path.basename(this.path)));
            this.dialogMessage = "Battle video backupped!"
            this.$.dialog.toggle();
        } catch (e) {
            this.dialogMessage = "Couldn't backup battle video."
            this.$.dialog.toggle();
        }
    }
}
}
