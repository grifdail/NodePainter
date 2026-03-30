import { capitalCase } from "change-case";
import { readdir, writeFile } from "fs/promises";
import path from "path";

async function run() {


    await extractImageToJson('particles');
    await extractImageToJson('patterns');
}

run()

async function extractImageToJson(folder) {
    var dir = await readdir(path.join(import.meta.dirname, "..", "public", "assets", folder), { withFileTypes: true });
    var res = Object.fromEntries(dir.map(file => {
        return [
            capitalCase(path.parse(file.name).name),
            path.relative(path.join(import.meta.dirname, "..", "public"), path.join(file.path, file.name))
        ];
    }));
    await writeFile(path.join(import.meta.dirname, "..", "src", "Data", `${folder}.json`), JSON.stringify(res, null, 4));

}
