"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new P(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.call(thisArg, _arguments)).next());
    });
};
var electron_1 = require("electron");
var Promise = require("bluebird");
var server_1 = require("electron-ipc-tunnel/server");
var child_process_1 = require("child_process");
function default_1() {
    var worker = child_process_1.fork(__dirname + "/../workers/dumper.js", [electron_1.app.getPath("userData") + "/keys"]);
    electron_1.app.on("window-all-closed", () => {
        worker.send({ cmd: "close" });
    });
    var id = 0;
    var promises = {};
    server_1.default("dump-save", function (reply, args) {
        return __awaiter(this, void 0, Promise, function* () {
            worker.send({ cmd: "dump-save", path: args, id: id });
            return new Promise(function (resolve, reject) {
                promises[id++] = { resolve: resolve, reject: reject };
            });
        });
    });
    server_1.default("dump-bv", function (reply, args) {
        return __awaiter(this, void 0, Promise, function* () {
            worker.send({ cmd: "dump-bv", path: args, id: id });
            return new Promise(function (resolve, reject) {
                promises[id++] = { resolve: resolve, reject: reject };
            });
        });
    });
    server_1.default("break-key", function (reply, args) {
        return __awaiter(this, void 0, Promise, function* () {
            worker.send({ cmd: "break-key", file1: args.file1, file2: args.file2, id: id });
            return new Promise(function (resolve, reject) {
                promises[id++] = { resolve: resolve, reject: reject };
            });
        });
    });
    server_1.default("break-folder", function (reply, folder) {
        return __awaiter(this, void 0, Promise, function* () {
            worker.send({ cmd: "break-folder", folder: folder, id: id });
            return new Promise(function (resolve, reject) {
                promises[id++] = { resolve: resolve, reject: reject };
            });
        });
    });
    worker.on("message", function (res) {
        if (res.err === undefined) {
            promises[res.id].resolve(res.res);
        }
        else {
            promises[res.id].reject(res.err);
        }
        delete promises[res.id];
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
