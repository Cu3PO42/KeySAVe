import IpcClient from "electron-ipc-tunnel/client";
import { PolymerElement, component, property, observe } from "polymer-decorators";
import fs = require("fs");

(() => {
@component("key-breaker")
class KeyBreaker extends PolymerElement {
    @property({type: String})
    file1: string;

    @property({type: String})
    file2: string;

    @property({type: Array})
    breakMessage: string[];

    @property({type: Object})
    fileOptions: GitHubElectron.Dialog.OpenDialogOptions;

    @property({type: Object})
    folderOptions: GitHubElectron.Dialog.OpenDialogOptions;

    ipcClient: IpcClient;

    file1Type: string;
    file2Type: string;

    constructor() {
        super();

        this.fileOptions = process.platform !== "darwin" ? {} : {filters: [{name: "SAV (1MB)", extensions: ["bin", "sav"]}, {name: "Battle Video", extensions: [""]}]};
        this.folderOptions = {properties: ["openDirectory"]};

        this.ipcClient = new IpcClient();
    }

    async break() {
        if (this.file1Type === this.file2Type && this.file1Type !== undefined) {
            var res = await this.ipcClient.send("break-key", {file1: this.file1, file2: this.file2});
            this.breakMessage = res.result.match(/^.*$/gm);
            this.$.dialogBreakDone.toggle();
        } else {
            this.$.dialogBreakNotSameFiles.toggle();
        }
    }

    closeBreakDone() {
        this.$.dialogBreakDone.close();
    }

    updateFileBase(name: string, oldValue: string) {
        if (this[name] !== undefined && this[name] !== "")
            fs.stat(this[name], (err, res) => {
                if (err) {
                    this[name] = oldValue;
                    this.$.dialogFileInvalid.toggle();
                } else
                    switch (res.size) {
                        case 0x100000:
                        case 0x10009C:
                        case 0x10019A:
                            this[name+"Type"] = "sav";
                            break;
                        case 28256:
                            this[name+"Type"] = "bv";
                            break;
                        default:
                            this[name] = oldValue;
                            this.$.dialogFileInvalid.toggle();
                            break;
                    }
            })
    }

    @observe("file1")
    file1Changed(newValue, oldValue) {
        this.updateFileBase("file1", oldValue);
    }

    @observe("file2")
    file2Changed(newValue, oldValue) {
        this.updateFileBase("file2", oldValue);
    }

    @observe("folder")
    async folderChanged(newValue, oldValue) {
        if (this.ipcClient !== undefined) {
            this.$.dialogBreakingFolder.toggle();
            await this.ipcClient.send("break-folder", newValue);
            this.$.dialogBreakingFolder.toggle();
        }
    }
}
Polymer(KeyBreaker);
})();
