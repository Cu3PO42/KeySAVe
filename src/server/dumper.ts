import { app } from "electron";
import * as Promise from "bluebird";
import registerIpc from "electron-ipc-tunnel/server";
import { fork } from "child_process";

export default function() {
    var worker = fork(__dirname + "/../workers/dumper.js")

    app.on("window-all-closed", () => {
        worker.send("close");
    });

    var id: number = 0;
    var promises: { [id: number]: { resolve: Function, reject: Function} } = {};
    registerIpc("dump-save", async function(reply, args) {
        worker.send({ cmd: "dump-save", path: args, id: id });
        return new Promise(function(resolve, reject) {
            promises[id++] = { resolve: resolve, reject: reject };
        });
    });

    registerIpc("dump-bv", async function(reply, args) {
        worker.send({ cmd: "dump-bv", path: args, id: id });
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
        if (res.e === undefined) {
            promises[res.id].resolve(res.res);
        } else {
            promises[res.id].reject(res.err);
        }
        delete promises[res.id];
    });
};
