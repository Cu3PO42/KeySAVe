/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../core/KeySAVCoreJS.d.ts"/>
var ipcServer = require("electron-ipc-tunnel/server");
var fs = require("fs");
var KeySAVCore = require("../core/KeySAVCore");
function bufToArr(buf) {
    var tmp = [];
    for (var i = 0; i < buf.length; i++) {
        tmp.push(buf.readUInt8(i));
    }
    return tmp;
}
module.exports = function () {
    ipcServer.on("dump-save", function (reply, path) {
        fs.readFile(path, function (err, buf) {
            var arr = bufToArr(buf);
            var res = [];
            var reader = KeySAVCore.SaveBreaker.Load(arr);
            var tmp;
            for (var i = 0; i < 31 * 30; i++) {
                tmp = reader.getPkx(i);
                if (tmp !== null) {
                    res.push(tmp);
                }
            }
            reply("dump-save-result", res);
        });
    });
};
