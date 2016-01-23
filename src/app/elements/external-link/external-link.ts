/// <reference path="../../bower_components/polymer-ts/polymer-ts.ts"/>
import electron = require("electron");
import { PolymerElement, component, listen } from "polymer-decorators";
const remote = electron.remote;

(() => {
var openExternal = remote.require("shell").openExternal;
@component("external-link", "a")
class ExternalLink extends PolymerElement {
    href: string;
    @listen("tap")
    onTap(e) {
        e.preventDefault();
        openExternal(this.href);
    }
}
Polymer(ExternalLink);
})()
