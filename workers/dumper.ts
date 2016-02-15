import * as KeySAV from "keysavcore";
import * as path from "path";
import * as fs from "fs-extra";
import * as Promise from "bluebird";
import * as _ from "lodash";
import "../init/promisify-fs";

function bufToArr(buf: Buffer) {
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
}

var dataDirectory = process.argv[2];
var store = new KeySAV.KeyStoreFileSystem(dataDirectory);
KeySAV.setKeyStore(store);

async function close() {
    store.close();
}

async function dumpBv(args) {
    try {
        var buf = await fs.readFileAsync(args.path);
        var arr = bufToArr(buf);
        var reader = await KeySAV.loadBv(arr);
        var myTeam = [], enemyTeam = [];
        var tmp;
        for (let i = 0; i < 6; ++i) {
            tmp = reader.getPkx(i, false);
            if (tmp !== undefined) {
                myTeam.push(tmp);
            }
            tmp = reader.getPkx(i, true);
            if (tmp !== undefined) {
                enemyTeam.push(tmp);
            }
        }
        process.send({ res: { enemyDumpable: reader.dumpsEnemy, myTeam: myTeam, enemyTeam: enemyTeam }, id: args.id});
    } catch (e) {
        process.send({err: e, id: args.id});
    }
}

async function dumpSave(args) {
    try {
        var buf = await fs.readFileAsync(args.path);
        var arr = bufToArr(buf);
        var reader = await KeySAV.loadSav(arr);
        reader.scanSlots();
        var res = [];
        var tmp;
        for (let i = 0; i < 31*30; i++) {
            tmp = reader.getPkx(i);
            if (tmp !== undefined) {
                res.push(tmp);
            }
        }
        process.send({ res: { pokemon: res, isNewKey: reader.isNewKey }, id: args.id });
    } catch (e) {
        process.send({err: e, id: args.id});
    }
}

async function breakKey(args) {
    try {
        var files = await Promise.map([fs.readFileAsync(args.file1), fs.readFileAsync(args.file2)], bufToArr);
        if (files[0].length === 28256 && files[1].length === 28256) {
            var bvres = await KeySAV.breakBv(files[0], files[1]);
            process.send({ res: bvres, id: args.id });
            return;
        } else {
            files = _.map(files, (f) => f.subarray(f.length % 0x100000));
            var savres = await KeySAV.breakSav(files[0], files[1]);
            process.send({ res: savres, id: args.id });
            return;
        }
    } catch (e) {
        process.send({err: e, id: args.id});
    }
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

process.on("message", function(m) {
    switch(m.cmd) {
        case "dump-bv":
            dumpBv(m);
            break;
        case "dump-save":
            dumpSave(m);
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
