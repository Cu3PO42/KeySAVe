import IpcClient from "electron-ipc-tunnel/client";
import { PolymerElement, component, property, observe, computed } from "polymer-decorators";
import * as fse from "fs-extra";
import * as path from "path-extra";

var backupDirectory = path.join(path.homedir(), "Documents", "KeySAVe", "backup");
fse.mkdirpSync(backupDirectory);

@component("save-dumper")
class SaveDumper extends PolymerElement {
    @property
    lowerBox: number;

    @property
    upperBox: number;

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
}
