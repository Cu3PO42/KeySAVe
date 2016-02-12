/// <reference path="../typings/fs-extra/fs-extra.d.ts"/>
/// <reference path="../typings/bluebird/bluebird.d.ts"/>
import * as fs from "fs-extra";
import * as Promise from "bluebird";

Promise.promisifyAll(fs);

fs.existsAsync = function(path) {
    return new Promise<boolean>(function(resolve, reject) {
        fs.exists(path, resolve);
    });
};
(<any>fs.existsAsync).__isPromisified__ = true;

fs.readAsync = <any>Promise.promisify(fs.read, {multiArgs: true});
fs.writeAsync = <any>Promise.promisify(fs.write, {multiArgs: true});
