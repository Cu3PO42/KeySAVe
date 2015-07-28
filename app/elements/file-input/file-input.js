/// <reference path="../../../bower_components/polymer-ts/polymer-ts.ts"/>
/// <reference path="../../../typings/github-electron/github-electron.d.ts"/>
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
(function () {
    var FileInput = (function (_super) {
        __extends(FileInput, _super);
        function FileInput() {
            var _this = this;
            _super.call(this);
            this.ipcClient = new IpcClient();
            this.ipcClient.on("file-dialog-open-result", function (reply) {
                if (reply !== undefined)
                    _this.path = reply[0];
            });
            if (this.buttonText === undefined)
                this.buttonText = "Choose file";
        }
        FileInput.prototype.openDialog = function () {
            var _this = this;
            setTimeout(function () { return _this.ipcClient.send("file-dialog-open"); }, 350);
        };
        __decorate([
            property({ type: String, reflectToAttribute: true, notify: true }), 
            __metadata('design:type', String)
        ], FileInput.prototype, "path");
        __decorate([
            property({ type: String, reflectToAttribute: true }), 
            __metadata('design:type', String)
        ], FileInput.prototype, "buttonText");
        FileInput = __decorate([
            component("file-input"), 
            __metadata('design:paramtypes', [])
        ], FileInput);
        return FileInput;
    })(polymer.Base);
    polymer.createElement(FileInput);
})();
