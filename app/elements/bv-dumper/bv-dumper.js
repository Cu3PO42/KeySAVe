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
/// <reference path="../../../typings/node/node.d.ts"/>
var IpcClient = require("electron-ipc-tunnel/client");
var fs = require("fs");
var path = require("path-extra");
(function () {
    function mkdirOptional(path) {
        if (!fs.existsSync(path))
            fs.mkdirSync(path);
    }
    var backupDirectory = path.join(path.homedir(), "Documents", "KeySAVe", "backup");
    mkdirOptional(path.join(path.homedir(), "Documents", "KeySAVe"));
    mkdirOptional(backupDirectory);
    var BvDumper = (function (_super) {
        __extends(BvDumper, _super);
        function BvDumper() {
            var _this = this;
            _super.call(this);
            this.enemyDumpable = false;
            this.team = "myTeam";
            this.fileOptions = process.platform === "win32" ? {} : { filters: [{ name: "Battle Video", extensions: [""] }] };
            this.ipcClient = new IpcClient();
            this.ipcClient.on("dump-bv-dumped", function (res) {
                _this.enemyDumpable = res.enemyDumpable;
                _this.myTeam = res.myTeam;
                if (res.enemyDumpable) {
                    _this.enemyTeam = res.enemyTeam;
                }
                else {
                    _this.enemyTeam = [];
                    _this.team = "myTeam";
                }
                _this.$.results.pokemon = _this[_this.team];
            });
            this.ipcClient.on("dump-bv-nokey", function () {
                _this.path = "";
                _this.dialogMessage = "You have to break for this video first!";
                _this.$.dialog.toggle();
            });
        }
        BvDumper.prototype.pathChanged = function (newValue, oldValue) {
            var _this = this;
            if (newValue !== "" && newValue !== undefined)
                fs.stat(newValue, function (err, stats) {
                    if (err !== null || stats.size !== 28256) {
                        _this.path = oldValue;
                        _this.dialogMessage = "Sorry, but this is not a valid battle video!";
                        _this.$.dialog.toggle();
                    }
                    else {
                        _this.ipcClient.send("dump-bv", _this.path);
                    }
                });
        };
        BvDumper.prototype.teamChanged = function (newValue, oldValue) {
            this.$.results.pokemon = this[newValue];
        };
        BvDumper.prototype.not = function (val) {
            return !val;
        };
        BvDumper.prototype.backup = function () {
            var _this = this;
            if (this.path)
                fs.createReadStream(this.path).pipe(fs.createWriteStream(path.join(backupDirectory, path.basename(this.path))).on("error", function () {
                    _this.dialogMessage = "Couldn't backup battle video.";
                    _this.$.dialog.toggle();
                }))
                    .on("error", function () {
                    _this.dialogMessage = "Couldn't backup battle video.";
                    _this.$.dialog.toggle();
                })
                    .on("finish", function () {
                    _this.dialogMessage = "Battle video backupped!";
                    _this.$.dialog.toggle();
                });
        };
        __decorate([
            property({ type: String }), 
            __metadata('design:type', String)
        ], BvDumper.prototype, "path");
        __decorate([
            property({ type: Boolean }), 
            __metadata('design:type', Object)
        ], BvDumper.prototype, "enemyDumpable");
        __decorate([
            property({ type: String }), 
            __metadata('design:type', Object)
        ], BvDumper.prototype, "team");
        __decorate([
            property({ type: Object }), 
            __metadata('design:type', Object)
        ], BvDumper.prototype, "format");
        __decorate([
            property({ type: String }), 
            __metadata('design:type', String)
        ], BvDumper.prototype, "language");
        __decorate([
            property({ type: Object }), 
            __metadata('design:type', Object)
        ], BvDumper.prototype, "fileOptions");
        __decorate([
            property({ type: String }), 
            __metadata('design:type', String)
        ], BvDumper.prototype, "dialogMessage");
        Object.defineProperty(BvDumper.prototype, "pathChanged",
            __decorate([
                observe("path"), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Object, Object]), 
                __metadata('design:returntype', Object)
            ], BvDumper.prototype, "pathChanged", Object.getOwnPropertyDescriptor(BvDumper.prototype, "pathChanged")));
        Object.defineProperty(BvDumper.prototype, "teamChanged",
            __decorate([
                observe("team"), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Object, Object]), 
                __metadata('design:returntype', Object)
            ], BvDumper.prototype, "teamChanged", Object.getOwnPropertyDescriptor(BvDumper.prototype, "teamChanged")));
        BvDumper = __decorate([
            component("bv-dumper"), 
            __metadata('design:paramtypes', [])
        ], BvDumper);
        return BvDumper;
    })(polymer.Base);
    polymer.createElement(BvDumper);
})();
