import JSZip from "jszip";
import { useCallback, useEffect, useState } from "react";
import { default as RM } from "remotestoragejs";
import { PlayerPrefExport } from "../Types/PlayerPrefStore";
import { SketchSave } from "../Types/SketchTemplate";
import { usePlayerPref } from "./usePlayerPref";


const rmInstance = new RM({
    logging: false,
    cache: false,
})
rmInstance.access.claim("node-painter", "rw");
const remoteFileRoot = rmInstance.scope("/node-painter/")




function getSketchRemotePath(name: string): string {
    return `sketches/${name.replaceAll(/[^a-zA-Z0-9-]+/gi, "_")}.json`;
}


export const useRemoteStorage = () => {
    const [isConnected, setIsConnected] = useState(rmInstance.connected)
    const [sketches, setSketches] = useState<string[]>([])
    const [userAdress, setUserAdress] = useState(rmInstance?.remote?.userAddress)


    const syncSketches = useCallback(async () => {
        if (!rmInstance.connected) {
            return;
        }
        const items = await remoteFileRoot.getListing("sketches/") as Record<string, boolean>;

        const result = Object.keys(items).map(item => item.replace(/\.json$/gi, ""))
        setSketches(result);
    }, [])

    useEffect(() => {
        const cbConnected = async () => {
            setIsConnected(true);
            setUserAdress(rmInstance.remote.userAddress);
            console.log(await remoteFileRoot.getListing())
        };
        const cbDisconnected = () => {
            setIsConnected(true)
        };
        rmInstance.addEventListener("connected", cbConnected)
        rmInstance.addEventListener("disconnected", cbDisconnected);
        syncSketches()
        return () => {
            rmInstance.removeEventListener("connected", cbConnected)
            rmInstance.removeEventListener("disconnected", cbDisconnected);
        }
    }, [syncSketches])


    const saveSketch = useCallback(async function (name: string, sketchData: SketchSave) {
        if (rmInstance.connected) {
            await remoteFileRoot.storeFile("application/json", getSketchRemotePath(name), JSON.stringify(sketchData));
        }
    }, []);

    const deleteSketch = useCallback(async function (name: string) {
        if (rmInstance.connected) {

            return await remoteFileRoot.remove(getSketchRemotePath(name));
        }
    }, []);

    const getSketchContent = useCallback(async (name: string): Promise<SketchSave | null> => {
        if (rmInstance.connected) {
            const r = await remoteFileRoot.getFile(getSketchRemotePath(name)) as any;
            if (r && r.contentType === "application/json" && r.data) {
                return JSON.parse(r.data) as SketchSave;
            }
        }
        return null;
    }, [])

    function connect(name: string) {
        rmInstance.connect(name)
    }

    function disconnect() {
        rmInstance.disconnect();
    }

    async function syncPlayerPref() {
        const r = await remoteFileRoot.getFile("settings.json") as any;
        if (r && r.contentType === "application/json" && r.data) {
            const pref = JSON.parse(r.data) as PlayerPrefExport;
            usePlayerPref.getState().loadJson(pref)
        }
    }

    return {

        isConnected,
        sketchs: sketches,
        saveSketch,
        deleteSketch,
        getSketchContent,
        connect,
        savePlayerPref,
        syncPlayerPref,
        userAdress,
        disconnect,
        exportToZip
    }
}

function savePlayerPref() {
    const playerPref = usePlayerPref.getState();
    const json = JSON.stringify(playerPref.getExportJson());
    remoteFileRoot.storeFile("application/json", "settings.json", json);
}

async function exportToZip() {
    let zip: JSZip = new JSZip();

    async function exploreFolder(path: string) {
        var files = await remoteFileRoot.getListing(path) as Record<string, any>;
        console.log(files);
        await Promise.all(Object.entries(files).map(async ([fileName, metadata]) => {
            const fullPath = path + fileName
            if (metadata && metadata["Content-Type"]) {
                const response = await remoteFileRoot.getFile(fullPath) as Record<string, any>;
                if (response && response.data) {
                    console.log(`adding file '${fullPath}'`)
                    zip.file(fullPath.slice(2), response.data)
                }

            } else {
                console.log(`adding folder '${fullPath}'`)
                return await exploreFolder(fullPath);
            }
        }))
    }
    await exploreFolder("./")

    return await zip.generateAsync({ type: "blob", compression: "DEFLATE" });


}


export function recordPlayerPref() {
    usePlayerPref.subscribe((playerPref) => {
        savePlayerPref();
    });


}