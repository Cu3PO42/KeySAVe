import { app } from "electron";
import * as Promise from "bluebird";
import registerIpc from "electron-ipc-tunnel/server";
import { fork } from "child_process";

function deserializeError(e) {
    var res = new Error(e.message);
    res.name = e.name;
    Object.assign(res, e.props); 
    return res;
}

export default function() {
    var worker = fork(__dirname + "/../workers/bootstrap.js", [__dirname + "/../workers/dumper", app.getPath("userData") + "/keys"]);

    app.on("window-all-closed", () => {
        worker.send({ cmd: "close" });
    });

    var id: number = 0;
    var promises: { [id: number]: { resolve: Function, reject: Function} } = {};

    registerIpc("dump-save-or-bv", async function(reply, args) {
        console.log("received request to dump save or bv: " + args);
        worker.send({ cmd: "dump-save-or-bv", file: args, id: id });
        return new Promise(function(resolve, reject) {
            promises[id++] = { resolve: resolve, reject: reject };
        });
    });

    registerIpc("break-key", async function(reply, args) {
        worker.send({ cmd: "break-key", file1: args.file1, file2: args.file2, id: id });
        return new Promise(function(resolve, reject) {
            promises[id++] = { resolve: resolve, reject: reject };
        });
    });

    registerIpc("break-folder", async function(reply, folder) {
        worker.send({ cmd: "break-folder", folder: folder, id: id });
        return new Promise(function(resolve, reject) {
            promises[id++] = { resolve: resolve, reject: reject };
        });
    });

    worker.on("message", function(res) {
        if (res.err === undefined) {
            promises[res.id].resolve(res.res);
        } else {
            promises[res.id].reject(deserializeError(res.err));
        }
        delete promises[res.id];
    });
};
