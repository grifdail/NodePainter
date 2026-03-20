import { usePlayerPref } from "../../Hooks/usePlayerPref";
import { PlayerPrefExport } from "../../Types/PlayerPrefStore";
import { RemoteStorage } from "./remoteStorage";

export function recordPlayerPref() {
    usePlayerPref.subscribe((playerPref) => {
        const json = JSON.stringify(playerPref.getExportJson());
        RemoteStorage.savePlayerPref(json);
    })
    RemoteStorage.onConnect(async (files) => {
        const r = await files.getFile("settings.json") as any;
        if (r && r.contentType === "application/json" && r.data) {
            const pref = JSON.parse(r.data) as PlayerPrefExport;
            usePlayerPref.getState().loadJson(pref)
        }
    })
}