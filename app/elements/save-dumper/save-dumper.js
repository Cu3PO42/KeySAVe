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
var IpcClient = require("electron-ipc-tunnel/client");
(function () {
    var SaveDumper = (function (_super) {
        __extends(SaveDumper, _super);
        function SaveDumper() {
            var _this = this;
            _super.call(this);
            this.lowerBox = 1;
            this.upperBox = 31;
            this.ipcClient = new IpcClient();
            this.ipcClient.on("dump-save-result", function (res) {
                _this.$.results.pokemon = res;
            });
        }
        SaveDumper.prototype.dump = function () {
            this.ipcClient.send("dump-save", { path: this.$.input.path, lower: this.lowerBox, upper: this.upperBox });
        };
        __decorate([
            property({ type: Number }), 
            __metadata('design:type', Number)
        ], SaveDumper.prototype, "lowerBox");
        __decorate([
            property({ type: Number }), 
            __metadata('design:type', Number)
        ], SaveDumper.prototype, "upperBox");
        SaveDumper = __decorate([
            component("save-dumper"), 
            __metadata('design:paramtypes', [])
        ], SaveDumper);
        return SaveDumper;
    })(polymer.Base);
    createElement(SaveDumper);
})();
