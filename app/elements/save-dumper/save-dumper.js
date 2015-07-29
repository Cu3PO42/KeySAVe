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
/// <reference path="../../../bower_components/polymer-ts/polymer-ts.ts"/>
/// <reference path="../../../typings/github-electron/github-electron.d.ts"/>
/// <reference path="../../../typings/node/node.d.ts"/>
var IpcClient = require("electron-ipc-tunnel/client");
var fs = require("fs");
(function () {
    var SaveDumper = (function (_super) {
        __extends(SaveDumper, _super);
        function SaveDumper() {
            var _this = this;
            _super.call(this);
            this.lowerBox = 1;
            this.upperBox = 31;
            this.opened = false;
            this.fileOptions = { filters: [{ name: "SAV (1MB)", extensions: ["bin", "sav"] }, { name: "Main File", extensions: [""] }] };
            this.ipcClient = new IpcClient();
            this.ipcClient.on("dump-save-opened", function (res) {
                _this.opened = true;
            });
            this.ipcClient.on("dump-save-dumped", function (res) {
                _this.$.results.pokemon = res;
            });
            this.ipcClient.on("dump-save-nokey", function () {
                _this.path = "";
                _this.$.dialogNokey.toggle();
            });
        }
        SaveDumper.prototype.dump = function () {
            if (this.opened)
                this.ipcClient.send("dump-save-dump", { lower: this.lowerBox, upper: this.upperBox });
        };
        SaveDumper.prototype.pathChange = function (newPath, oldPath) {
            var _this = this;
            if (newPath !== "" && newPath !== undefined)
                fs.stat(newPath, function (err, stats) {
                    if (err) {
                        _this.path = oldPath;
                        _this.$.dialogInvalid.toggle();
                    }
                    else
                        switch (stats.size) {
                            case 0x100000:
                            case 0x10009C:
                            case 0x10019A:
                            case 0x76000:
                            case 0x65600:
                                _this.ipcClient.send("dump-save-open", _this.path);
                                _this.opened = false;
                                break;
                            default:
                                _this.path = oldPath;
                                _this.$.dialogInvalid.toggle();
                                break;
                        }
                });
        };
        __decorate([
            property({ type: Number }), 
            __metadata('design:type', Number)
        ], SaveDumper.prototype, "lowerBox");
        __decorate([
            property({ type: Number }), 
            __metadata('design:type', Number)
        ], SaveDumper.prototype, "upperBox");
        __decorate([
            property({ type: String }), 
            __metadata('design:type', String)
        ], SaveDumper.prototype, "path");
        __decorate([
            property({ type: String }), 
            __metadata('design:type', String)
        ], SaveDumper.prototype, "formatString");
        __decorate([
            property({ type: Object }), 
            __metadata('design:type', Object)
        ], SaveDumper.prototype, "fileOptions");
        Object.defineProperty(SaveDumper.prototype, "pathChange",
            __decorate([
                observe("path"), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Object, Object]), 
                __metadata('design:returntype', Object)
            ], SaveDumper.prototype, "pathChange", Object.getOwnPropertyDescriptor(SaveDumper.prototype, "pathChange")));
        SaveDumper = __decorate([
            component("save-dumper"), 
            __metadata('design:paramtypes', [])
        ], SaveDumper);
        return SaveDumper;
    })(polymer.Base);
    polymer.createElement(SaveDumper);
})();
