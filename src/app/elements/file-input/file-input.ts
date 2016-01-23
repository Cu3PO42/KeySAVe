import IpcClient from "electron-ipc-tunnel/client";
import { PolymerElement, component, property, observe } from "polymer-decorators";

(() => {
@component("file-input")
class FileInput extends PolymerElement {
    @property({type: String, reflectToAttribute: true, notify: true})
    path: string;

    @property({type: String, reflectToAttribute: true})
    buttonText: string;

    @property({type: Object})
    options: any;

    ipcClient: IpcClient;

    attached() {
        this.ipcClient = new IpcClient();

        if (this.buttonText === undefined)
            this.buttonText = "Choose file";
    }

    openDialog() {
        setTimeout(async () => {
            try {
                var reply = await this.ipcClient.send("file-dialog-open", {options: this.options});
            } catch (e) { console.log (e);}
            if (reply !== undefined) {
                this.path = reply[0];
            }
        }, 350);
    }
}
Polymer(FileInput);
})()
