/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../core/KeySAVCoreJS.d.ts"/>
import ipcServer = require("electron-ipc-tunnel/server");
import fs = require("fs");
import KeySAVCore = require("../core/KeySAVCore");

function bufToArr(buf: Buffer) {
    var tmp: number[] = [];
    for (let i = 0; i < buf.length; i++) {
        tmp.push(buf.readUInt8(i));
    }
    return tmp;
}

export = function() {
    ipcServer.on("dump-save", function(reply, path) {
        fs.readFile(path, function(err, buf) {
            var arr = bufToArr(buf);
            var res = [];
            var reader = KeySAVCore.SaveBreaker.Load(arr);
            var tmp;
            for (let i = 0; i < 31*30; i++) {
                tmp = reader.getPkx(i);
                if (tmp !== null) {
                    res.push(tmp);
                }
            }
            reply("dump-save-result", res);
        });
    });
};
