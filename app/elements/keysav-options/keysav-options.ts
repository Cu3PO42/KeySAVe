/// <reference path="../../../bower_components/polymer-ts/polymer-ts.ts"/>
/// <reference path="../../../typings/github-electron/github-electron.d.ts" />
/// <reference path="../../../typings/node/node.d.ts" />
/// <reference path="../../../typings/path-extra/path-extra.d.ts" />

import IpcClient = require("electron-ipc-tunnel/client");
import fs = require("fs");
import path = require("path-extra");

function mkdirOptional(path) {
    if (!fs.existsSync(path))
        fs.mkdirSync(path);
}

(() => {
var keysavDir = path.join(path.homedir(), "Documents", "KeySAVe");
var configFile = path.join(keysavDir, "config.json");
mkdirOptional(keysavDir);

var config;
if (fs.existsSync(configFile))
    config = JSON.parse(fs.readFileSync(path.join(keysavDir, "config.json"), {encoding: "utf-8"}))
else
    config = {
        formattingOptions: [
            {
                name: "Default",
                format: "B{{box}} - {{row}},{{column}} - {{speciesName}} - {{natureName}} - {{abilityName}} - {{ivHp}}.{{ivAtk}}.{{ivDef}}.{{ivSpAtk}}.{{ivSpDef}}.{{ivSpe}} - {{typeName hpType}} [{{esv}}]"
            },
            {
                name: "Reddit",
                format: "B{{box}} | {{row}},{{column}} | {{speciesName}} | {{natureName}} | {{abilityName}} | {{ivHp}}.{{ivAtk}}.{{ivDef}}.{{ivSpAtk}}.{{ivSpDef}}.{{ivSpe}} | {{typeName hpType}} [{{esv}}]"
            },
            {
                name: "TSV",
                format: "B{{box}} - {{row}},{{column}} - {{esv}} - {{tsv}}"
            },
            {
                name: "Custom",
                format: ""
            },
            {
                name: "JSON",
                format: "{{toJson this}}"
            }
        ]
    };

@component("keysav-options")
class KeysavOptions extends polymer.Base {
    @property({type: String, reflectToAttribute: true, notify: true})
    formatString: string;

    @property({type: String})
    file1: string;

    @property({type: String})
    file2: string;

    @property({type: Array})
    breakMessage: string[];

    @property({type: Array})
    formattingOptions = [
    ];

    @property({type: Number})
    selectedFormatIndex: number;

    @property({type: Object, notify: true})
    selectedFormat: any;

    @property({type: Object})
    fileOptions: GitHubElectron.Dialog.OpenDialogOptions;

    @property({type: Array, computed: "getFormatNames(formattingOptions.*)"})
    formatNames: string[];

    ipcClient: IpcClient;
    breakResult;

    file1Type: string;
    file2Type: string;

    constructor() {
        super();

        this.fileOptions = {filters: [{name: "SAV (1MB)", extensions: ["bin", "sav"]}, {name: "Main File", extensions: [""]}, {name: "Battle Video", extensions: [""]}]}

        this.ipcClient = new IpcClient();

        this.formattingOptions = config.formattingOptions;
        this.selectedFormat = this.formattingOptions[0];

        this.ipcClient.on("break-key-result", (arg) => {
            this.breakMessage = arg.result.match(/^.*$/gm);
            this.breakResult = arg;
            this.$.dialogBreakDone.toggle();
        });

        this.ipcClient.on("file-dialog-save-result", (arg) => {
            if (arg) {
                this.ipcClient.send("break-key-store", {path: arg});
            } else {
                this.ipcClient.send("break-key-cancel");
            }
        });

        window.addEventListener("beforeunload", (e) => {
            fs.writeFileSync(configFile, JSON.stringify({formattingOptions: this.formattingOptions}, null, 4), {encoding: "utf-8"});
        }, false);
    }

    break() {
        if (this.file1Type === this.file2Type && this.file1Type !== undefined)
            this.ipcClient.send("break-key", {file1: this.file1, file2: this.file2});
        else
            this.$.dialogBreakNotSameFiles.toggle();
    }

    saveBreak() {
        if (this.breakResult.success) {
            this.ipcClient.send("file-dialog-save", <{options: GitHubElectron.Dialog.OpenDialogOptions}>{options: {defaultPath: this.breakResult.path, filters: [{name: "Key file", extensions: ["bin"]}]}});
        } else {
            this.ipcClient.send("break-key-cancel");
        }
    }

    cancelBreak() {
        this.ipcClient.send("break-key-cancel");
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

    @observe("selectedFormatIndex")
    selectedFormatIndexChanged(newValue, oldValue) {
        if (this.formattingOptions !== undefined && this.selectedFormat !== undefined) {
            this.selectedFormat = this.formattingOptions[newValue];
        }
    }

    selectedFormatNameChanged(e) {
        if (this.selectedFormat)
            this.notifyPath("formattingOptions."+this.selectedFormatIndex+".name", this.selectedFormat.name, false);
    }

    getFormatNames(change) {
        return change.base.map((e) => e.name);
    }

    addFormatOption() {
        this.push("formattingOptions", {name: "Custom Formatting Option", format: ""});
        this.selectedFormatIndex = this.formattingOptions.length-1;
    }

    deleteFormatOption() {
        if (this.formattingOptions.length > 0)
        {
            this.splice("formattingOptions", this.selectedFormatIndex, 1);
            this.selectedFormat = this.formattingOptions[this.selectedFormatIndex];
        }
    }
}
polymer.createElement(KeysavOptions);
})()
