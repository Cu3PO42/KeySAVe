/// <reference path="./mscorlib.d.ts" />
/// <reference path="../typings/cuint/cuint.d.ts" />

import cuint = require("cuint");

var mul_const = cuint.UINT32(1103515245);
var add_const = cuint.UINT32(24691);

export = {
    Unicode16LE: {
        GetString: function(arr: number[], offset: number, length: number) {
            var buf = new Buffer(length);
            for (let i = 0; i < length; ++i) {
                buf.writeUInt8(arr[offset+i], i);
            }
            return buf.toString("ucs2");
        },

        GetBytes: function(str: string) {
            var tmp = new Buffer(str, "ucs2"),
                res: byte[] = [];
            for (let i = 0; i < tmp.length; ++i) {
                res.push(tmp.readUInt8(i));
            }
            return res;
        }
    },

    LCRNG: {
        next: function(seed: number) {
            return cuint.UINT32(seed).multiply(mul_const).add(add_const).toNumber() >>> 0;
        }
    }
}
