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
(function () {
    var BvDumper = (function (_super) {
        __extends(BvDumper, _super);
        function BvDumper() {
            var _this = this;
            _super.call(this);
            this.enemyDumpable = false;
            this.team = "my-team";
            this.opened = false;
            this.ipcClient = new IpcClient();
            this.ipcClient.on("dump-bv-opened", function (res) {
                _this.enemyDumpable = res.enemyDumpable;
                console.log(res);
                _this.opened = true;
            });
            this.ipcClient.on("dump-bv-dumped", function (res) {
                _this.$.results.pokemon = res;
            });
            this.ipcClient.on("dump-bv-nokey", function () {
                _this.path = "";
                _this.$.dialogNokey.toggle();
            });
        }
        BvDumper.prototype.dump = function () {
            if (this.opened)
                this.ipcClient.send("dump-bv-dump", this.enemyDumpable && this.team === "enemy-team");
        };
        BvDumper.prototype.pathChanged = function (newValue, oldValue) {
            var _this = this;
            if (newValue !== "" && newValue !== undefined)
                fs.stat(newValue, function (err, stats) {
                    if (err !== null || stats.size !== 28256) {
                        _this.path = oldValue;
                        _this.$.dialogInvalid.toggle();
                    }
                    else {
                        _this.ipcClient.send("dump-bv-open", _this.path);
                        _this.opened = false;
                    }
                });
        };
        BvDumper.prototype.not = function (val) {
            return !val;
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
            property({ type: String }), 
            __metadata('design:type', String)
        ], BvDumper.prototype, "formatString");
        Object.defineProperty(BvDumper.prototype, "pathChanged",
            __decorate([
                observe("path"), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Object, Object]), 
                __metadata('design:returntype', Object)
            ], BvDumper.prototype, "pathChanged", Object.getOwnPropertyDescriptor(BvDumper.prototype, "pathChanged")));
        BvDumper = __decorate([
            component("bv-dumper"), 
            __metadata('design:paramtypes', [])
        ], BvDumper);
        return BvDumper;
    })(polymer.Base);
    createElement(BvDumper);
})();
