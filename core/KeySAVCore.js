/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />
var vm = require('vm');
var fs = require('fs');
var _ = require('lodash');
function loadKeySAVCore() {
    var sandbox = {
        KeySAVCore: {},
        console: console,
        require: _.noop,
        module: module,
        process: process,
        global: undefined
    };
    sandbox.global = sandbox;
    _.extend(sandbox, require("./jsextensions"));
    vm.createContext(sandbox);
    vm.runInContext(fs.readFileSync(require.resolve('./mscorlib')).toString(), sandbox);
    vm.runInContext(fs.readFileSync(require.resolve('./KeySAVCoreJS')).toString(), sandbox);
    return sandbox.KeySAVCore;
}
module.exports = loadKeySAVCore();
