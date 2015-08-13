/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/github-electron/github-electron.d.ts" />
/// <reference path="../typings/async/async.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />
/// <reference path="../typings/path-extra/path-extra.d.ts" />
var ipcServer = require("electron-ipc-tunnel/server");
var fs = require("fs");
var KeySAV = require("keysavcore");
var app = require("app");
var async = require("async");
var _ = require("lodash");
var util = require("util");
var path = require("path-extra");
var Promise = require("bluebird");
Promise.promisifyAll(fs);
function bufToArr(buf) {
    var tmp = new Uint8Array(buf.length);
    for (var i = 0; i < buf.length; i++) {
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
module.exports = function () {
    var dataDirectory = path.join(path.homedir(), "Documents", "KeySAVe", "data");
    mkdirOptional(path.join(path.homedir(), "Documents", "KeySAVe"));
    mkdirOptional(dataDirectory);
    var store = new KeySAV.Extensions.KeyStore(dataDirectory);
    app.on("window-all-closed", function () { return store.close(); });
    ipcServer.on("dump-save", function (reply, args) {
        fs.readFile(args, function (err, buf) {
            var arr = bufToArr(buf);
            if (arr.length > 0x100000)
                arr = arr.subarray(arr.length % 0x100000);
            KeySAV.Core.SaveBreaker.Load(arr, store.getSaveKey.bind(store), function (e, reader) {
                if (e) {
                    reply("dump-save-nokey");
                    return;
                }
                reader.scanSlots();
                var res = [];
                var tmp;
                for (var i = 0; i < 31 * 30; i++) {
                    tmp = reader.getPkx(i);
                    if (tmp !== null) {
                        res.push(tmp);
                    }
                }
                reply("dump-save-dumped", res);
            });
        });
    });
    ipcServer.on("dump-bv", function (reply, args) {
        fs.readFile(args, function (err, buf) {
            var arr = bufToArr(buf);
            KeySAV.Core.BattleVideoBreaker.Load(arr, store.getBvKey.bind(store), function (e, reader) {
                if (e) {
                    reply("dump-bv-nokey");
                    return;
                }
                var myTeam = [], enemyTeam = [];
                var tmp;
                for (var i = 0; i < 6; ++i) {
                    tmp = reader.getPkx(i, false);
                    if (tmp !== null) {
                        myTeam.push(tmp);
                    }
                    tmp = reader.getPkx(i, true);
                    if (tmp !== null) {
                        enemyTeam.push(tmp);
                    }
                }
                reply("dump-bv-dumped", { enemyDumpable: reader.get_DumpsEnemy(), myTeam: myTeam, enemyTeam: enemyTeam });
            });
        });
    });
    var bvBreakRes;
    var savBreakRes;
    var breakInProgress;
    ipcServer.on("break-key", function (reply, args) {
        async.parallel([fs.readFile.bind(fs, args.file1), fs.readFile.bind(fs, args.file2)], function (err, res) {
            var files = _.map(res, bufToArr);
            if (files[0].length === 28256 && files[1].length === 28256) {
                breakInProgress = 1;
                bvBreakRes = KeySAV.Core.BattleVideoBreaker.Break(files[0], files[1]);
                reply("break-key-result", { success: bvBreakRes.success, path: path.join(dataDirectory, "BV Key - " + (args.file1.match(/(\d+)[^\/\\]*$/) || { 1: "00000000" })[1] + ".bin"), result: bvBreakRes.result });
            }
            else {
                breakInProgress = 2;
                files = _.map(files, function (f) { return f.subarray(f.length % 0x100000); });
                savBreakRes = KeySAV.Core.SaveBreaker.Break(files[0], files[1]);
                if (savBreakRes.success) {
                    var resPkx = new KeySAV.Core.Structures.PKX.ctor$1(savBreakRes.resPkx, 0, 0, false);
                    var savePath = path.join(dataDirectory, util.format("SAV Key - %s - (%s.%s) - TSV %s.bin", resPkx.ot, padNumber(resPkx.tid), padNumber(resPkx.sid), ("0000" + resPkx.tsv).slice(-4)));
                }
                else {
                    savePath = "";
                }
                reply("break-key-result", { success: savBreakRes.success, path: savePath, result: savBreakRes.result });
            }
        });
    });
    ipcServer.on("break-key-store", function (reply, args) {
        switch (breakInProgress) {
            case 1:
                store.setKey(args.path, bvBreakRes.key);
                breakInProgress = 0;
                bvBreakRes = undefined;
                break;
            case 2:
                store.setKey(args.path, savBreakRes.key.keyData, savBreakRes.key);
                breakInProgress = 0;
                savBreakRes = undefined;
                break;
        }
    });
    ipcServer.on("break-key-cancel", function () {
        breakInProgress = 0;
        bvBreakRes = savBreakRes = undefined;
    });
    ipcServer.on("break-folder", function (reply, folder) {
        fs.readdirAsync(folder)
            .map(function (fileName) {
            var file = path.join(folder, fileName);
            return fs.statAsync(file)
                .then(function (stat) {
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
                    .then(function (buf) {
                    var arr = bufToArr(buf);
                    if (arr.length > 0x100000)
                        arr = arr.subarray(arr.length % 0x100000);
                    return Promise.promisify(KeySAV.Core.SaveBreaker.Load)(arr, store.getSaveKey.bind(store));
                })
                    .then(function (reader) {
                    reader.scanSlots();
                });
            });
        }, { concurrency: 1 })
            .then(function () {
            reply("break-folder-result");
        })
            .catch(function () {
            reply("break-folder-result");
        });
    });
};
