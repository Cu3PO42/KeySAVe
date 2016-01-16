/// <reference path="../../bower_components/polymer-ts/polymer-ts.ts"/>
/// <reference path="../../../typings/github-electron/github-electron.d.ts" />
import electron = require("electron");
const remote = electron.remote;

(() => {
var openExternal = remote.require("shell").openExternal;
@component("external-link")
@extend("a")
class ExternalLink extends polymer.Base {
    href: string;
    @listen("tap")
    onTap(e) {
        e.preventDefault();
        openExternal(this.href);
    }
}
polymer.createElement(ExternalLink);
})()
