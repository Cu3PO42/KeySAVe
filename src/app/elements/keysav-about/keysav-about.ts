import { PolymerElement, component, property, observe } from "polymer-decorators";

@component("keysav-about")
class KeysavAbout extends PolymerElement {
    @property
    version: string;

    attached() {
        this.version = require("../package.json").version;
    }
}
