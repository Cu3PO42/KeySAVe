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
/// <reference path="../../../typings/github-electron/github-electron.d.ts" />
var IpcClient = require("electron-ipc-tunnel/client");
(function () {
    var KeysavOptions = (function (_super) {
        __extends(KeysavOptions, _super);
        function KeysavOptions() {
            var _this = this;
            _super.call(this);
            this.ipcClient = new IpcClient();
            this.ipcClient.on("break-key-result", function (arg) {
                _this.breakMessage = arg.result.match(/^.+$/gm);
                _this.breakResult = arg;
                _this.$.dialog.toggle();
            });
            this.ipcClient.on("file-dialog-save-result", function (arg) {
                if (arg) {
                    _this.ipcClient.send("break-key-store", { path: arg });
                }
                else {
                    _this.ipcClient.send("break-key-cancel");
                }
            });
        }
        KeysavOptions.prototype.break = function () {
            this.ipcClient.send("break-key", { file1: this.file1, file2: this.file2 });
        };
        KeysavOptions.prototype.saveBreak = function () {
            if (this.breakResult.success) {
                this.ipcClient.send("file-dialog-save", { options: { defaultPath: process.cwd() + "/data/" + this.breakResult.path, extensions: ["bin"] } });
            }
            else {
                this.ipcClient.send("break-key-cancel");
            }
        };
        KeysavOptions.prototype.cancelBreak = function () {
            this.ipcClient.send("break-key-cancel");
        };
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
        KeysavOptions = __decorate([
            component("keysav-options"), 
            __metadata('design:paramtypes', [])
        ], KeysavOptions);
        return KeysavOptions;
    })(polymer.Base);
    createElement(KeysavOptions);
})();
