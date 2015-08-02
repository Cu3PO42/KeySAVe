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
var IpcClient = require("electron-ipc-tunnel/client");
(function () {
    var ElectronUpdater = (function (_super) {
        __extends(ElectronUpdater, _super);
        function ElectronUpdater() {
            _super.apply(this, arguments);
        }
        ElectronUpdater.prototype.attached = function () {
            var _this = this;
            this.ipcClient = new IpcClient();
            this.ipcClient.on("update-available", function () {
                _this.$.dialog.toggle();
            });
            this.ipcClient.send("update-query");
        };
        ElectronUpdater.prototype.update = function () {
            this.ipcClient.send("update-do");
        };
        ElectronUpdater = __decorate([
            component("electron-updater"), 
            __metadata('design:paramtypes', [])
        ], ElectronUpdater);
        return ElectronUpdater;
    })(polymer.Base);
    polymer.createElement(ElectronUpdater);
})();
