/// <reference path="./mscorlib.d.ts" />
/// <reference path="../typings/cuint/cuint.d.ts" />
var cuint = require("cuint");
var mul_const = cuint.UINT32(1103515245);
var add_const = cuint.UINT32(24691);
module.exports = {
    Unicode16LE: {
        GetString: function (arr, offset, length) {
            var buf = new Buffer(length);
            for (var i = 0; i < length; ++i) {
                buf.writeUInt8(arr[offset + i], i);
            }
            return buf.toString("ucs2");
        },
        GetBytes: function (str) {
            var tmp = new Buffer(str, "ucs2"), res = [];
            for (var i = 0; i < tmp.length; ++i) {
                res.push(tmp.readUInt8(i));
            }
            return res;
        }
    },
    LCRNG: {
        next: function (seed) {
            return cuint.UINT32(seed).multiply(mul_const).add(add_const).toNumber() >>> 0;
        }
    }
};
