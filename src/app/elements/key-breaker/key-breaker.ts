import IpcClient from "electron-ipc-tunnel/client";
import { PolymerElement, component, property, observe } from "polymer-decorators";
import * as fs from "fs-extra";

@component("key-breaker")
class KeyBreaker extends PolymerElement {
    @property
    file1: string;

    @property
    file2: string;

    @property
    breakMessage: string[];

    @property
    fileOptions: GitHubElectron.Dialog.OpenDialogOptions;

    @property
    folderOptions: GitHubElectron.Dialog.OpenDialogOptions;

    ipcClient: IpcClient;

    file1Type: string;
    file2Type: string;

    attached() {
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

    async updateFileBase(name: string, oldValue: string) {
        if (this[name] !== undefined && this[name] !== "") {
            try {
                var res = await fs.statAsync(this[name]);
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
            } catch (e) {
                this[name] = oldValue;
                this.$.dialogFileInvalid.toggle();
            }
        }
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
