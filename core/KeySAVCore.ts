/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />

import vm = require('vm');
import fs = require('fs');
import _ = require('lodash');
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
    return <any>sandbox.KeySAVCore;
}
export = loadKeySAVCore();
