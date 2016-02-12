"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
var KeySAV = require("keysavcore");
var path = require("path");
var fs = require("fs-extra");
var Promise = require("bluebird");
var _ = require("lodash");
require("../init/promisify-fs");
function bufToArr(buf) {
    var tmp = new Uint8Array(buf.length);
    for (let i = 0; i < buf.length; i++) {
        tmp[i] = buf.readUInt8(i);
    }
    return tmp;
}
var dataDirectory = process.argv[2];
var store = new KeySAV.KeyStoreFileSystem(dataDirectory);
KeySAV.setKeyStore(store);
function close() {
    return __awaiter(this, void 0, Promise, function* () {
        store.close();
    });
}
function dumpBv(args) {
    return __awaiter(this, void 0, Promise, function* () {
        try {
            var buf = yield fs.readFileAsync(args.path);
            var arr = bufToArr(buf);
            var reader = yield KeySAV.loadBv(arr);
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
            process.send({ res: { enemyDumpable: reader.dumpsEnemy, myTeam: myTeam, enemyTeam: enemyTeam }, id: args.id });
        }
        catch (e) {
            process.send({ err: e, id: args.id });
        }
    });
}
function dumpSave(args) {
    return __awaiter(this, void 0, Promise, function* () {
        try {
            var buf = yield fs.readFileAsync(args.path);
            var arr = bufToArr(buf);
            var reader = yield KeySAV.loadSav(arr);
            reader.scanSlots();
            var res = [];
            var tmp;
            for (let i = 0; i < 31 * 30; i++) {
                tmp = reader.getPkx(i);
                if (tmp !== undefined) {
                    res.push(tmp);
                }
            }
            process.send({ res: { pokemon: res, isNewKey: reader.isNewKey }, id: args.id });
        }
        catch (e) {
            process.send({ err: e, id: args.id });
        }
    });
}
function breakKey(args) {
    return __awaiter(this, void 0, Promise, function* () {
        try {
            var files = yield Promise.map([fs.readFileAsync(args.file1), fs.readFileAsync(args.file2)], bufToArr);
            if (files[0].length === 28256 && files[1].length === 28256) {
                var bvres = yield KeySAV.breakBv(files[0], files[1]);
                process.send({ res: bvres, id: args.id });
                return;
            }
            else {
                files = _.map(files, (f) => f.subarray(f.length % 0x100000));
                var savres = yield KeySAV.breakSav(files[0], files[1]);
                process.send({ res: savres, id: args.id });
                return;
            }
        }
        catch (e) {
            process.send({ err: e, id: args.id });
        }
    });
}
function breakFolder(args) {
    return __awaiter(this, void 0, Promise, function* () {
        try {
            yield fs.readdirAsync(args.folder)
                .map((fileName) => __awaiter(this, void 0, Promise, function* () {
                var file = path.join(args.folder, fileName);
                var stat = yield fs.statAsync(file);
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
                var buf = yield fs.readFileAsync(file);
                var arr = bufToArr(buf);
                var reader = yield KeySAV.loadSav(arr);
                reader.scanSlots();
            }));
            process.send({ id: args.id });
        }
        catch (e) {
            process.send({ err: e, id: args.id });
        }
    });
}
process.on("message", function (m) {
    switch (m.cmd) {
        case "dump-bv":
            dumpBv(m);
            break;
        case "dump-save":
            dumpSave(m);
            break;
        case "break-key":
            breakKey(m);
            break;
        case "break-folder":
            breakFolder(m);
            break;
        case "close":
            close();
            break;
    }
});
