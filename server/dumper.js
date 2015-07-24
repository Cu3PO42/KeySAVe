/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/github-electron/github-electron.d.ts" />
var ipcServer = require("electron-ipc-tunnel/server");
var fs = require("fs");
var KeySAV = require("keysavcore");
var app = require("app");
function bufToArr(buf) {
    var tmp = new Uint8Array(buf.length);
    for (var i = 0; i < buf.length; i++) {
        tmp[i] = buf.readUInt8(i);
    }
    return tmp;
}
module.exports = function () {
    var store = new KeySAV.Extensions.SaveKeyStore(process.cwd() + "/data");
    app.on("window-all-closed", function () { return store.close(); });
    ipcServer.on("dump-save", function (reply, args) {
        fs.readFile(args.path, function (err, buf) {
            var arr = bufToArr(buf);
            if (arr.length > 0x100000)
                arr = arr.subarray(arr.length % 0x100000);
            KeySAV.Core.SaveBreaker.Load(arr, store.getKey.bind(store), function (e, reader) {
                if (e) {
                    console.log("muh error " + e);
                    return;
                }
                var res = [];
                var tmp;
                for (var i = 0 + 30 * (args.lower - 1); i < args.upper * 30; i++) {
                    tmp = reader.getPkx(i);
                    if (tmp !== null) {
                        res.push(tmp);
                    }
                }
                reply("dump-save-result", res);
            });
        });
    });
};
