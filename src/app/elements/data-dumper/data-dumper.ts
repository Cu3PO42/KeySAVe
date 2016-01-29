import IpcClient from "electron-ipc-tunnel/client";
import { PolymerElement, component, property, observe, computed } from "polymer-decorators";
import * as fse from "fs-extra";
import * as path from "path-extra";

namespace DataDumper {
var backupDirectory = path.join(path.homedir(), "Documents", "KeySAVe", "backup");
fse.mkdirpSync(backupDirectory);

@component("data-dumper")
class DataDumper extends PolymerElement {
    @property
    lowerBox: number;

    @property
    upperBox: number;   

    @property
    enemyDumpable: boolean;

    @property
    team: string;

    @property
    path: string;

    @property
    format: any;

    @property
    language: string;

    @property
    fileOptions: GitHubElectron.Dialog.OpenDialogOptions;

    @property
    dialogMessage: string;

    @property
    isNewKey: boolean;

    @property
    fileType: string;

    @property
    hideSaveControls: boolean;

    @property
    hideBvControls: boolean;

    myTeam: any[];

    enemyTeam: any[];

    ipcClient: IpcClient;

    attached() {
        this.lowerBox = 1;
        this.upperBox = 31;
        this.isNewKey = true;

        this.enemyDumpable = false;
        this.team = "myTeam";

        this.fileType = undefined;
        this.hideSaveControls = true;
        this.hideBvControls = true;

        this.fileOptions = process.platform !== "darwin" ? {} : {filters: [{name: "SAV (1MB)", extensions: ["bin", "sav"]}, {name: "Main File", extensions: [""]}, {name: "Battle Video", extensions: [""]}]};

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
                    this.fileType = "sav";
                    this.hideSaveControls = false;
                    this.hideBvControls = true;
                } catch (e) {
                    this.path = "";
                    this.dialogMessage = "You have to break for this save first!";
                    this.$.dialog.toggle();
                }
                break;
            case 28256:
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
                    this.fileType = "bv";
                    this.hideSaveControls = true;
                    this.hideBvControls = false;
                } catch (e) {
                    this.path = "";
                    this.dialogMessage = "You have to break for this video first!";
                    this.$.dialog.toggle();
                }
                break;
            default:
                this.path = oldPath;
                this.dialogMessage = "Sorry, but this is not a valid save or battle video!";
                this.$.dialog.toggle();
                break;
        }
    }

    @observe("team")
    teamChanged(newValue, oldValue) {
        this.$.results.pokemon = this[newValue];
    }

    async backup() {
        if (!this.path)
            return;
        try {
            await fse.copyAsync(this.path, path.join(backupDirectory, path.basename(this.path)));
            this.dialogMessage = `${this.fileType === "sav" ? "Save" : "Battle Video"} backupped!`
            this.$.dialog.toggle();
        } catch (e) {
            this.dialogMessage = `Couldn't backup ${this.fileType === "sav" ? "Save" : "Battle Video"}.`
            this.$.dialog.toggle();
        }
    }
}
}
