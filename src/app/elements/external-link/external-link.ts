import { remote } from "electron";
import { PolymerElement, component, extend, listen } from "polymer-decorators";

(() => {
var openExternal = remote.require("electron").shell.openExternal;
@component("external-link")
@extend("a")
class ExternalLink extends PolymerElement {
    @listen("tap")
    onTap(e) {
        e.preventDefault();
        openExternal(this.getAttribute("href"));
    }
}
})()
