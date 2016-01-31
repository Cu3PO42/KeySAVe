import * as fs from "fs-extra";
import * as pathe from "path-extra";
import "../init/promisify-fs";

async function search(path: string, depth: number, callback: (path: string) => void) {
    try {
        await fs.readdirAsync(path).map<string, void>(async function(path2) {
            var compoundPath = pathe.join(path, path2);
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
