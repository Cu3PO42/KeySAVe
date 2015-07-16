require("./core/KeySAVCoreJS");
var fs = require("fs");
function readFileToArray(file) { var tmp=fs.readFileSync(file), res = []; for(var i = 0; i<tmp.length;++i) res.push(tmp.readUInt8(i)); return res; }

var save = readFileToArray("/Users/Cu3PO42/Documents/Powersaves3DS/ECRA7ea5e021_2015-07-02_09-11-18_\(all-cool-event-stuff\).bin"),
    key = readFileToArray("/Users/Cu3PO42/development/KeySAV2/bin/Debug/data/SAV\ Key\ -\ Cu3PO42\ -\ \(63963.44421\)\ -\ TSV\ 1349.bin");

var reader = new KeySAVCore.SaveReaderEncrypted.ctor(save, new KeySAVCore.Structures.SaveKey.ctor(key));
var res = reader.getPkx(30);

console.log(res);
