"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new P(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.call(thisArg, _arguments)).next());
    });
};
var electron_gh_releases_updater_1 = require("electron-gh-releases-updater");
var prevCwd = process.cwd();
var update;
var server_1 = require("electron-ipc-tunnel/server");
function default_1() {
    server_1.default("update-query", () => __awaiter(this, void 0, Promise, function* () {
        update = yield electron_gh_releases_updater_1.default(require("../package.json"));
        if (update.updateAvailable) {
            return { available: true, changelog: update.changelog };
        }
        else {
            return { available: false };
        }
    }));
    server_1.default("update-do", (reply) => __awaiter(this, void 0, Promise, function* () {
        if (!update || !update.updateAvailable)
            throw new Error("No update avaiable.");
        update.update((progress) => {
            reply("update-progress", progress);
        });
    }));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
