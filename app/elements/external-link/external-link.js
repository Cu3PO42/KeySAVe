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
var remote = require("remote");
(function () {
    var openExternal = remote.require("shell").openExternal;
    var ExternalLink = (function (_super) {
        __extends(ExternalLink, _super);
        function ExternalLink() {
            _super.apply(this, arguments);
        }
        ExternalLink.prototype.onTap = function (e) {
            e.preventDefault();
            openExternal(this.href);
        };
        Object.defineProperty(ExternalLink.prototype, "onTap",
            __decorate([
                listen("tap"), 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Object]), 
                __metadata('design:returntype', Object)
            ], ExternalLink.prototype, "onTap", Object.getOwnPropertyDescriptor(ExternalLink.prototype, "onTap")));
        ExternalLink = __decorate([
            component("external-link"),
            extend("a"), 
            __metadata('design:paramtypes', [])
        ], ExternalLink);
        return ExternalLink;
    })(polymer.Base);
    polymer.createElement(ExternalLink);
})();
