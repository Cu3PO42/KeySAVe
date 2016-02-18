import * as KeySAV from "keysavcore";
import * as path from "path";
import * as fs from "fs-extra";
import Promise from "bluebird";
import * as _ from "lodash";
import "../../init/promisify-fs";

function bufToArr(buf: Buffer) {
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
}

function serializeError(e: Error) {
    return {
        message: e.message,
        name: e.name,
        props: Object.assign({}, e)
    }
}

var dataDirectory = process.argv[3];
var store = new KeySAV.KeyStoreFileSystem(dataDirectory);
KeySAV.setKeyStore(store);

async function close() {
    store.close();
}

async function breakFolder(args) {
    try {
        await fs.readdirAsync(args.folder)
        .map(async (fileName) => {
            try {
                var file = path.join(args.folder, fileName);
                var stat = await fs.statAsync(file);
                if (stat.isDirectory())
                    return;
                switch (stat.size) {
                    case 0x100000:
                    case 0x10009C:
                    case 0x10019A:
                        break;
                    default:
                        return;
                }
                var buf = await fs.readFileAsync(file)
                var arr = bufToArr(buf);
                var reader = await KeySAV.loadSav(arr);
                reader.scanSlots();
            } catch (e) {}
        });
        process.send({ id: args.id });
    } catch (e) {
        process.send({ err: e, id: args.id });
    }
}

async function dumpSaveOrBv(args) {
    try {
        var file = bufToArr(await fs.readFileAsync(args.file));
        var res = await KeySAV.loadSavOrBv(file);
        var reader = res.reader;
        if (res.type === "SAV") {
            process.send({ res: { pokemon: reader.getAllPkx(), goodKey: reader.isNewKey, type: "SAV" }, id: args.id });
        } else {
            process.send({ res: { pokemon: reader.getAllPkx(), goodKey: reader.dumpsEnemy, type: "BV" }, id: args.id });
        }
    }
    catch (e) {
        process.send({ err: serializeError(e), id: args.id });
    }
}

async function breakKey(args) {
    try {
        var files = await Promise.map([fs.readFileAsync(args.file1), fs.readFileAsync(args.file2)], bufToArr);
        return await KeySAV.breakSavOrBv(files[0], files[1]);
    }
    catch (e) {
        process.send({ err: serializeError(e), id: args.id });
    }
}

process.on("message", function(m) {
    switch (m.cmd) {
        case "dump-save-or-bv":
            dumpSaveOrBv(m);
            break;
        case "break-key":
            breakKey(m);
            break;
        case "break-folder":
            breakFolder(m);
            break;
        case "close":
            close();
            break;
    }
});
