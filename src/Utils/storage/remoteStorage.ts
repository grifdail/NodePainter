import { default as RM } from "remotestoragejs";
import BaseClient from "remotestoragejs/release/types/baseclient";
import { SketchSave } from "../../Types/SketchTemplate";


const rmInstance = new RM({
    logging: false,
    cache: false,
})
rmInstance.access.claim("node-painter", "rw");


const files = rmInstance.scope("/node-painter/")

rmInstance.on("connected", async () => {
    const listing = await files.getListing();
    console.log(listing);
});


export const RemoteStorage = {
    isConnected() {
        return rmInstance.connected;
    },
    connect(name: string) {
        rmInstance.connect(name)
    },
    savePlayerPref(file: string) {

        files.storeFile("application/json", "settings.json", file);
    },
    instance: rmInstance,
    onConnect(cb: (files: BaseClient) => void) {
        if (rmInstance.connected) {
            cb(files);
        } else {
            rmInstance.on("connected", async () => {
                cb(files);
            });
        }

    },
    async getSketches() {
        if (rmInstance.connected) {
            var items = await files.getListing("sketches/") as Record<string, boolean>

            return Object.keys(items).map(item => item.replace(/\.json$/gi, ""));
        }
        return []
    }, async getSketch(name: string): Promise<SketchSave | null> {
        if (rmInstance.connected) {
            const r = await files.getFile(getSketchRemotePath(name)) as any;

            console.log(r);
            if (r && r.contentType === "application/json" && r.data) {
                const pref = JSON.parse(r.data) as SketchSave;
                return pref;
            }
        }
        return null;
    },
    async saveSketch(name: string, sketchData: SketchSave) {
        if (rmInstance.connected) {

            var r = await files.storeFile("application/json", getSketchRemotePath(name), JSON.stringify(sketchData));
        }

    },
    async deleteSketch(name: string) {
        if (rmInstance.connected) {

            return await files.remove(getSketchRemotePath(name));
        }
    }
}


function getSketchRemotePath(name: string): string {
    return `sketches/${name.replaceAll(/[^a-zA-Z0-9-]+/gi, "_")}.json`;
}

