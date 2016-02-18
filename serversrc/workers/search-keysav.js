import * as fs from "fs-extra";
import { join } from "path";

async function search(path, depth, callback) {
    try {
        await fs.readdirAsync(path).map(async function(path2) {
            var compoundPath = join(path, path2);
                if (depth > 0 && (await fs.statAsync(compoundPath)).isDirectory())
                    await search(compoundPath, depth-1, callback);
                else if (path2 === "KeySAV2.exe")
                        callback(path);
        });
    } catch (e) {}
}

process.on("message", async function(m) {
    await search(m.path, m.depth, function(path) {
        process.send(path);
    });
    process.exit();
});
