import * as fs from "fs-extra";
import * as pathe from "path-extra";

export default async function search(path: string, depth: number, callback: (path: string) => void) {
    try {
        await fs.readdirAsync(path).map<string, void>(async function(path2) {
            var compoundPath = pathe.join(path, path2);
                if (depth > 0 && (await fs.statAsync(compoundPath)).isDirectory())
                    search(compoundPath, depth-1, callback);
                else if (path2 === "KeySAV2.exe")
                        callback(path);
        });
    } catch (e) {}
}
