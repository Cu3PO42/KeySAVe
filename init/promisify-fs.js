"use strict";
var fs = require("fs-extra");
var Promise = require("bluebird");
Promise.promisifyAll(fs);
fs.existsAsync = function (path) {
    return new Promise(function (resolve, reject) {
        fs.exists(path, resolve);
    });
};
fs.existsAsync.__isPromisified__ = true;
fs.readAsync = Promise.promisify(fs.read, { multiArgs: true });
fs.writeAsync = Promise.promisify(fs.write, { multiArgs: true });
