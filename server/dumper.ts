/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/github-electron/github-electron.d.ts" />
import ipcServer = require("electron-ipc-tunnel/server");
import fs = require("fs");
import KeySAV = require("keysavcore");
import app = require("app");

function bufToArr(buf: Buffer) {
    var tmp: Uint8Array = new Uint8Array(buf.length);
    for (let i = 0; i < buf.length; i++) {
        tmp[i] = buf.readUInt8(i);
    }
    return tmp;
}


export = function() {
    var store = new KeySAV.Extensions.KeyStore(process.cwd() + "/data");
    app.on("window-all-closed", () => store.close());
    ipcServer.on("dump-save", function(reply, args) {
        fs.readFile(args.path, function(err, buf) {
            var arr = bufToArr(buf);
            if (arr.length > 0x100000)
                arr = arr.subarray(arr.length % 0x100000);
            KeySAV.Core.SaveBreaker.Load(arr, store.getSaveKey.bind(store), function(e, reader: KeySAVCore.SaveReaderDecrypted) {
                if (e) {
                    // TODO notify client here
                    console.log("muh error " + e);
                    return;
                }
                var res = [];
                var tmp;
                for (let i = 0 + 30*(args.lower-1); i < args.upper*30; i++) {
                    tmp = reader.getPkx(i);
                    if (tmp !== null) {
                        res.push(tmp);
                    }
                }
                reply("dump-save-result", res);
            });
        });
    });
    ipcServer.on("dump-bv", function(reply, args) {
        fs.readFile(args.path, function(err, buf) {
            var arr = bufToArr(buf);
            KeySAV.Core.BattleVideoBreaker.Load(arr, store.getBvKey.bind(store), function(e, reader: KeySAVCore.BattleVideoReader) {
                var res = [];
                var tmp;
                for (let i = 0; i < 6; ++i) {
                    tmp = reader.getPkx(i, 0);
                    if (tmp !== null) {
                        res.push(tmp);
                    }
                }
                reply("dump-bv-result", res);
            });
        });
    });
};
