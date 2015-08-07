/// <reference path="../../../bower_components/polymer-ts/polymer-ts.ts"/>
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
(function () {
    var KeysavAbout = (function (_super) {
        __extends(KeysavAbout, _super);
        function KeysavAbout() {
            _super.call(this);
            this.version = require("../package.json").version;
        }
        __decorate([
            property({ type: String }), 
            __metadata('design:type', String)
        ], KeysavAbout.prototype, "version");
        KeysavAbout = __decorate([
            component("keysav-about"), 
            __metadata('design:paramtypes', [])
        ], KeysavAbout);
        return KeysavAbout;
    })(polymer.Base);
    polymer.createElement(KeysavAbout);
})();
