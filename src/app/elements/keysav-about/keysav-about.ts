/// <reference path="../../bower_components/polymer-ts/polymer-ts.ts"/>

(() => {
@component("keysav-about")
class KeysavAbout extends polymer.Base {
    @property({type: String})
    version: string;

    constructor() {
        super();
        this.version = require("../package.json").version;
    }
}
polymer.createElement(KeysavAbout);
})()
