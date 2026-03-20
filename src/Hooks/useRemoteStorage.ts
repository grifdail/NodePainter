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
        const cbConnected = () => {
            setIsConnected(true);
            setUserAdress(rmInstance.remote.userAddress);
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
        disconnect
    }
}

function savePlayerPref() {
    const playerPref = usePlayerPref.getState();
    const json = JSON.stringify(playerPref.getExportJson());
    remoteFileRoot.storeFile("application/json", "settings.json", json);
}


export function recordPlayerPref() {
    usePlayerPref.subscribe((playerPref) => {
        savePlayerPref();
    });


}