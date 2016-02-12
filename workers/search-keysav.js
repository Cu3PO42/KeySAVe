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
var fs = require("fs-extra");
var path_1 = require("path");
require("../init/promisify-fs");
function search(path, depth, callback) {
    return __awaiter(this, void 0, Promise, function* () {
        try {
            yield fs.readdirAsync(path).map(function (path2) {
                return __awaiter(this, void 0, Promise, function* () {
                    var compoundPath = path_1.join(path, path2);
                    if (depth > 0 && (yield fs.statAsync(compoundPath)).isDirectory())
                        yield search(compoundPath, depth - 1, callback);
                    else if (path2 === "KeySAV2.exe")
                        callback(path);
                });
            });
        }
        catch (e) { }
    });
}
process.on("message", function (m) {
    return __awaiter(this, void 0, Promise, function* () {
        yield search(m.path, m.depth, function (path) {
            process.send(path);
        });
        process.exit();
    });
});
