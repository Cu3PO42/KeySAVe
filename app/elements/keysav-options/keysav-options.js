/// <reference path="../../../bower_components/polymer-ts/polymer-ts.ts"/>
/// <reference path="../../../typings/github-electron/github-electron.d.ts" />
/// <reference path="../../../typings/node/node.d.ts" />
/// <reference path="../../../typings/path-extra/path-extra.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var IpcClient = require("electron-ipc-tunnel/client");
var fs = require("fs");
var path = require("path-extra");
function mkdirOptional(path) {
    if (!fs.existsSync(path))
        fs.mkdirSync(path);
}
(function () {
    var keysavDir = path.join(path.homedir(), "Documents", "KeySAVe");
    var configFile = path.join(keysavDir, "config.json");
    mkdirOptional(keysavDir);
    var config;
    if (fs.existsSync(configFile))
        config = JSON.parse(fs.readFileSync(path.join(keysavDir, "config.json"), { encoding: "utf-8" }));
    else
        config = {
            formattingOptions: [
                {
                    name: "Default",
                    header: "Box - Slot - Species (Gender) - Nature - Ability - HP.ATK.DEF.SPATK.SPDEF.SPE - HP [ESV]",
                    format: "B{{box}} - {{row}},{{column}} - {{speciesName}} ({{genderString}}) - {{natureName}} - {{abilityName}} - {{ivHp}}.{{ivAtk}}.{{ivDef}}.{{ivSpAtk}}.{{ivSpDef}}.{{ivSpe}} - {{typeName hpType}} [{{esv}}]"
                },
                {
                    name: "Reddit",
                    header: "Box | Slot | Species (Gender) | Nature | Ability | HP.ATK.DEF.SPATK.SPDEF.SPE | HP [ESV]",
                    format: "B{{box}} | {{row}},{{column}} | {{speciesName}} ({{genderString}}) | {{natureName}} | {{abilityName}} | {{ivHp}}.{{ivAtk}}.{{ivDef}}.{{ivSpAtk}}.{{ivSpDef}}.{{ivSpe}} | {{typeName hpType}} [{{esv}}]"
                },
                {
                    name: "TSV",
                    header: "Box - Slot - OT - TID - SID - TSV",
                    format: "B{{box}} - {{row}},{{column}} - {{ot}} - {{tid}} - {{sid}} - {{tsv}}"
                },
                {
                    name: "JSON",
                    header: "",
                    format: "{{toJson this}}"
                },
                {
                    name: "CSV",
                    header: "Box,Row,Column,Species,Gender,Nature,Ability,HP,ATK,DEF,SPATK,SPDEF,SPE,Hidden Power,ESV,TSV,Nickname,OT,Ball,TID,SID,HP EV,ATK EV,DEF EV,SPA EV,SPD EV,SPE EV,Move 1,Move 2,Move 3,Move 4,Relearn 1,Relearn 2,Relearn 3,Relearn 4,Shiny,Egg",
                    format: "{{box}},{{row}},{{column}},{{speciesName}},{{genderString}},{{natureName}},{{abilityName}},{{ivHp}},{{ivAtk}},{{ivSpAtk}},{{ivSpDef}},{{ivSpe}},{{typeName hpType}},{{esv}},{{tsv}},{{nickname}},{{ot}},{{ballName}},{{tid}},{{sid}},{{evHp}},{{evAtk}},{{evDef}},{{evSpAtk}},{{evSpDef}},{{evSpe}},{{moveName move1}},{{moveName move2}},{{moveName move3}},{{moveName move4}},{{moveName eggMove1}},{{moveName eggMove2}},{{moveName eggMove3}},{{moveName eggMove4}},{{isShiny}},{{isEgg}}"
                },
                {
                    name: "CSV (Raw data)",
                    header: "Box,Row,Column,Species,Gender,Nature,Ability,HP,ATK,DEF,SPATK,SPDEF,SPE,Hidden Power,ESV,TSV,Nickname,OT,Ball,TID,SID,HP EV,ATK EV,DEF EV,SPA EV,SPD EV,SPE EV,Move 1,Move 2,Move 3,Move 4,Relearn 1,Relearn 2,Relearn 3,Relearn 4,Shiny,Egg",
                    format: "{{box}},{{row}},{{column}},{{species}},{{gender}},{{nature}},{{ability}},{{ivHp}},{{ivAtk}},{{ivSpAtk}},{{ivSpDef}},{{ivSpe}},{{hpType}},{{esv}},{{tsv}},{{nickname}},{{ot}},{{ball}},{{tid}},{{sid}},{{evHp}},{{evAtk}},{{evDef}},{{evSpAtk}},{{evSpDef}},{{evSpe}},{{move1}},{{move2}},{{move3}},{{move4}},{{eggMove1}},{{eggMove2}},{{eggMove3}},{{eggMove4}},{{isShiny}},{{isEgg}}"
                }
            ],
            selectedFormatIndex: 0
        };
    var KeysavOptions = (function (_super) {
        __extends(KeysavOptions, _super);
        function KeysavOptions() {
            var _this = this;
            _super.call(this);
            this.formattingOptions = [];
            this.fileOptions = { filters: [{ name: "SAV (1MB)", extensions: ["bin", "sav"] }, { name: "Main File", extensions: [""] }, { name: "Battle Video", extensions: [""] }] };
            this.ipcClient = new IpcClient();
            this.formattingOptions = config.formattingOptions;
            this.selectedFormatIndex = config.selectedFormatIndex;
            this.selectedFormat = this.formattingOptions[config.selectedFormatIndex];
            this.ipcClient.on("break-key-result", function (arg) {
                _this.breakMessage = arg.result.match(/^.*$/gm);
                _this.breakResult = arg;
                _this.$.dialogBreakDone.toggle();
            });
            this.ipcClient.on("file-dialog-save-result", function (arg) {
                if (arg) {
                    _this.ipcClient.send("break-key-store", { path: arg });
                }
                else {
                    _this.ipcClient.send("break-key-cancel");
                }
            });
            window.addEventListener("beforeunload", function (e) {
                fs.writeFileSync(configFile, JSON.stringify({ formattingOptions: _this.formattingOptions, selectedFormatIndex: _this.selectedFormatIndex }, null, 4), { encoding: "utf-8" });
            }, false);
        }
        KeysavOptions.prototype.break = function () {
            if (this.file1Type === this.file2Type && this.file1Type !== undefined)
                this.ipcClient.send("break-key", { file1: this.file1, file2: this.file2 });
            else
                this.$.dialogBreakNotSameFiles.toggle();
        };
        KeysavOptions.prototype.saveBreak = function () {
            if (this.breakResult.success) {
                this.ipcClient.send("file-dialog-save", { options: { defaultPath: this.breakResult.path, filters: [{ name: "Key file", extensions: ["bin"] }] } });
            }
            else {
                this.ipcClient.send("break-key-cancel");
            }
        };
        KeysavOptions.prototype.cancelBreak = function () {
            this.ipcClient.send("break-key-cancel");
        };
        KeysavOptions.prototype.updateFileBase = function (name, oldValue) {
            var _this = this;
            if (this[name] !== undefined && this[name] !== "")
                fs.stat(this[name], function (err, res) {
                    if (err) {
                        _this[name] = oldValue;
                        _this.$.dialogFileInvalid.toggle();
                    }
                    else
                        switch (res.size) {
                            case 0x100000:
                            case 0x10009C:
                            case 0x10019A:
                                _this[name + "Type"] = "sav";
                                break;
                            case 28256:
                                _this[name + "Type"] = "bv";
                                break;
                            default:
                                _this[name] = oldValue;
                                _this.$.dialogFileInvalid.toggle();
                                break;
                        }
                });
        };
        KeysavOptions.prototype.file1Changed = function (newValue, oldValue) {
            this.updateFileBase("file1", oldValue);
        };
        KeysavOptions.prototype.file2Changed = function (newValue, oldValue) {
            this.updateFileBase("file2", oldValue);
        };
        KeysavOptions.prototype.selectedFormatIndexChanged = function (newValue, oldValue) {
            if (this.formattingOptions !== undefined && this.selectedFormat !== undefined) {
                this.selectedFormat = this.formattingOptions[newValue];
            }
        };
        KeysavOptions.prototype.selectedFormatNameChanged = function (e) {
            if (this.selectedFormat)
                this.notifyPath("formattingOptions." + this.selectedFormatIndex + ".name", this.selectedFormat.name, false);
        };
        KeysavOptions.prototype.getFormatNames = function (change) {
            return change.base.map(function (e) { return e.name; });
        };
        KeysavOptions.prototype.addFormatOption = function () {
            this.push("formattingOptions", { name: "Custom Formatting Option", format: "", header: "" });
            this.selectedFormatIndex = this.formattingOptions.length - 1;
        };
        KeysavOptions.prototype.deleteFormatOption = function () {
            if (this.formattingOptions.length > 0) {
                this.splice("formattingOptions", this.selectedFormatIndex, 1);
                this.selectedFormat = this.formattingOptions[this.selectedFormatIndex];
            }
        };
        __decorate([
            property({ type: String, reflectToAttribute: true, notify: true }), 
            __metadata('design:type', String)
        ], KeysavOptions.prototype, "formatString");
        __decorate([
            property({ type: String }), 
            __metadata('design:type', String)
        ], KeysavOptions.prototype, "file1");
        __decorate([
            property({ type: String }), 
            __metadata('design:type', String)
        ], KeysavOptions.prototype, "file2");
        __decorate([
            property({ type: Array }), 
            __metadata('design:type', Array)
        ], KeysavOptions.prototype, "breakMessage");
        __decorate([
            property({ type: Array }), 
            __metadata('design:type', Object)
        ], KeysavOptions.prototype, "formattingOptions");
        __decorate([
            property({ type: Number }), 
            __metadata('design:type', Number)
        ], KeysavOptions.prototype, "selectedFormatIndex");
        __decorate([
            property({ type: Object, notify: true }), 
            __metadata('design:type', Object)
        ], KeysavOptions.prototype, "selectedFormat");
        __decorate([
            property({ type: Object }), 
            __metadata('design:type', Object)
        ], KeysavOptions.prototype, "fileOptions");
        __decorate([
            property({ type: Array, computed: "getFormatNames(formattingOptions.*)" }), 
            __metadata('design:type', Array)
        ], KeysavOptions.prototype, "formatNames");
        Object.defineProperty(KeysavOptions.prototype, "file1Changed",
            __decorate([
                observe("file1"), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Object, Object]), 
                __metadata('design:returntype', Object)
            ], KeysavOptions.prototype, "file1Changed", Object.getOwnPropertyDescriptor(KeysavOptions.prototype, "file1Changed")));
        Object.defineProperty(KeysavOptions.prototype, "file2Changed",
            __decorate([
                observe("file2"), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Object, Object]), 
                __metadata('design:returntype', Object)
            ], KeysavOptions.prototype, "file2Changed", Object.getOwnPropertyDescriptor(KeysavOptions.prototype, "file2Changed")));
        Object.defineProperty(KeysavOptions.prototype, "selectedFormatIndexChanged",
            __decorate([
                observe("selectedFormatIndex"), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Object, Object]), 
                __metadata('design:returntype', Object)
            ], KeysavOptions.prototype, "selectedFormatIndexChanged", Object.getOwnPropertyDescriptor(KeysavOptions.prototype, "selectedFormatIndexChanged")));
        KeysavOptions = __decorate([
            component("keysav-options"), 
            __metadata('design:paramtypes', [])
        ], KeysavOptions);
        return KeysavOptions;
    })(polymer.Base);
    polymer.createElement(KeysavOptions);
})();
