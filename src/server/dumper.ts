/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/github-electron/github-electron.d.ts" />
/// <reference path="../typings/async/async.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />
/// <reference path="../typings/path-extra/path-extra.d.ts" />
/// <reference path="../typings/fs-extra/fs-extra.d.ts" />

import * as fs from "fs-extra";
import * as KeySAV from "keysavcore";
import { app } from "electron";
import * as _ from "lodash";
import * as util from "util";
import * as path from "path-extra";
import * as Promise from "bluebird";
import registerIpc from "electron-ipc-tunnel/server";

function bufToArr(buf: Buffer) {
    var tmp: Uint8Array = new Uint8Array(buf.length);
    for (let i = 0; i < buf.length; i++) {
        tmp[i] = buf.readUInt8(i);
    }
    return tmp;
}

function padNumber(n) {
    return ("00000" + n).slice(-5);
}

function mkdirOptional(path) {
    if (!fs.existsSync(path))
        fs.mkdirSync(path);
}

export default function() {
    var dataDirectory = path.join(path.homedir(), "Documents", "KeySAVe", "data");
    mkdirOptional(path.join(path.homedir(), "Documents", "KeySAVe"));
    mkdirOptional(dataDirectory);
    var store = new KeySAV.KeyStoreFileSystem(dataDirectory);
    KeySAV.setKeyStore(store);
    app.on("window-all-closed", () => store.close());

    registerIpc("dump-save", async function(reply, args) {
        var buf = await fs.readFileAsync(args);
        var arr = bufToArr(buf);
        var reader = await KeySAV.loadSav(arr);
        reader.scanSlots();
        var res = [];
        var tmp;
        for (let i = 0; i < 31*30; i++) {
            tmp = reader.getPkx(i);
            if (tmp !== undefined) {
                res.push(tmp);
            }
        }
        return { pokemon: res, isNewKey: reader.isNewKey };
    });

    registerIpc("dump-bv", async function(reply, args) {
        var buf = await fs.readFileAsync(args);
        var arr = bufToArr(buf);
        var reader = await KeySAV.loadBv(arr);
        var myTeam = [], enemyTeam = [];
        var tmp;
        for (let i = 0; i < 6; ++i) {
            tmp = reader.getPkx(i, false);
            if (tmp !== undefined) {
                myTeam.push(tmp);
            }
            tmp = reader.getPkx(i, true);
            if (tmp !== undefined) {
                enemyTeam.push(tmp);
            }
        }
        return {enemyDumpable: reader.dumpsEnemy, myTeam: myTeam, enemyTeam: enemyTeam};
    });

    registerIpc("break-key", async function(reply, args) {
        var files = await Promise.map([fs.readFileAsync(args.file1), fs.readFileAsync(args.file2)], bufToArr);
        if (files[0].length === 28256 && files[1].length === 28256) {
            return await KeySAV.breakBv(files[0], files[1]);
        } else {
            files = _.map(files, (f) => f.subarray(f.length % 0x100000));
            return await KeySAV.breakSav(files[0], files[1]);
        }
    });

    registerIpc("break-folder", async function(reply, folder) {
        await fs.readdirAsync(folder)
        .map(async (fileName) => {
            var file = path.join(folder, fileName);
            var stat = await fs.statAsync(file);
            if (stat.isDirectory())
                return;
            switch (stat.size) {
                case 0x100000:
                case 0x10009C:
                case 0x10019A:
                    break;
                default:
                    return;
            }
            var buf = await fs.readFileAsync(file)
            var arr = bufToArr(buf);
            var reader = await KeySAV.loadSav(arr);
            reader.scanSlots();
        }, { concurrency: 1 });
        return;
    });
};
