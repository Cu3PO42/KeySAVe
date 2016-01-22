/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/github-electron/github-electron.d.ts" />
/// <reference path="../typings/async/async.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />
/// <reference path="../typings/path-extra/path-extra.d.ts" />
/// <reference path="../typings/fs-extra/fs-extra.d.ts" />

import ipcServer = require("electron-ipc-tunnel/server");
import fs = require("fs-extra");
import KeySAV = require("keysavcore");
import electron = require("electron");
const app = electron.app;
import async = require("async");
import _ = require("lodash");
import util = require("util");
import path = require("path-extra");
import Promise = require("bluebird");

Promise.promisifyAll(fs);

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

export = function() {
    var dataDirectory = path.join(path.homedir(), "Documents", "KeySAVe", "data");
    mkdirOptional(path.join(path.homedir(), "Documents", "KeySAVe"));
    mkdirOptional(dataDirectory);
    var store = new KeySAV.KeyStoreFileSystem(dataDirectory);
    KeySAV.setKeyStore(store);
    app.on("window-all-closed", () => store.close());

    ipcServer.on("dump-save", function(reply, args) {
        fs.readFile(args, async function(err, buf) {
            var arr = bufToArr(buf);
            try {
                var reader = await KeySAV.loadSav(arr);
            } catch (e) {
                reply("dump-save-nokey");
                return;
            }
            reader.scanSlots();
            var res = [];
            var tmp;
            for (let i = 0; i < 31*30; i++) {
                tmp = reader.getPkx(i);
                if (tmp !== undefined) {
                    res.push(tmp);
                }
            }
            reply("dump-save-dumped", {pokemon: res, isNewKey: reader.isNewKey});
        });
    });

    ipcServer.on("dump-bv", function(reply, args) {
        fs.readFile(args, async function(err, buf) {
            var arr = bufToArr(buf);
            try {
                var reader = await KeySAV.loadBv(arr);
            } catch (e) {
                reply("dump-bv-nokey");
                return;
            }
            var myTeam = [], enemyTeam = [];
            var tmp;
            for (let i = 0; i < 6; ++i) {
                tmp = reader.getPkx(i, false);
                if (tmp !== null) {
                    myTeam.push(tmp);
                }
                tmp = reader.getPkx(i, true);
                if (tmp !== null) {
                    enemyTeam.push(tmp);
                }
            }
            reply("dump-bv-dumped", {enemyDumpable: reader.dumpsEnemy, myTeam: myTeam, enemyTeam: enemyTeam});
        });
    });

    var bvBreakRes: KeySAV.BattleVideoBreakResult;
    var savBreakRes: KeySAV.SaveBreakResult;
    var breakInProgress: number;

    ipcServer.on("break-key", function(reply, args) {
        // TODO get rid of async here
        async.parallel([fs.readFile.bind(fs, args.file1), fs.readFile.bind(fs, args.file2)], async function(err, res: Buffer[]) {
            var files = _.map(res, bufToArr);
            if (files[0].length === 28256 && files[1].length === 28256) {
                breakInProgress = 1;
                bvBreakRes = KeySAV.breakBv(files[0], files[1]);
                reply("break-key-result", bvBreakRes);
            } else {
                breakInProgress = 2;
                files = _.map(files, (f) => f.subarray(f.length % 0x100000));
                savBreakRes = await KeySAV.breakSav(files[0], files[1]);
                reply("break-key-result", savBreakRes);
            }
        });
    });

    ipcServer.on("break-key-store", function(reply, args) {
        // TODO Fix a grammar error here. switch() doesn't work
        switch (breakInProgress) {
            case 1:
                breakInProgress = 0;
                bvBreakRes = undefined;
                break;
            case 2:
                breakInProgress = 0;
                savBreakRes = undefined;
                break;
        }
    });

    ipcServer.on("break-key-cancel", function() {
        breakInProgress = 0;
        bvBreakRes = savBreakRes = undefined;
    });

    ipcServer.on("break-folder", function(reply, folder) {
        fs.readdirAsync(folder)
        .map((fileName) => {
            var file = path.join(folder, fileName);
            return fs.statAsync(file)
            .then((stat) => {
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
                return fs.readFileAsync(file)
                .then((buf) => {
                    var arr = bufToArr(buf);
                    if (arr.length > 0x100000)
                        arr = arr.subarray(arr.length % 0x100000);
                    return KeySAV.loadSav(arr);
                })
                .then((reader) => {
                    reader.scanSlots();
                });
            })
        }, {concurrency: 1})
        .then(() => {
            reply("break-folder-result");
        })
        .catch(() => {
            reply("break-folder-result");
        });
    });
};
