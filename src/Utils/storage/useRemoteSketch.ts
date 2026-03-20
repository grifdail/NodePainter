import { useCallback, useEffect, useState } from "react";
import { SketchSave } from "../../Types/SketchTemplate";
import { RemoteStorage } from "./remoteStorage";


export function useRemoteSketch(): [string[] | undefined, (name: string, sketchData: SketchSave) => void, (name: string) => void, (name: string) => Promise<SketchSave | null>] {

    const [sketchs, setSketches] = useState<string[]>([])
    useEffect(() => {
        const cb = async () => {
            var names = await RemoteStorage.getSketches();
            if (names) {
                setSketches(names);
            }
        }
        if (RemoteStorage.isConnected()) {
            cb();
        }

    }, [])
    /*
    const saveSketch = useCallback((name: string, sketchData: SketchSave) => {
        db.sketchs.put({
            name,
            content: JSON.stringify(sketchData),
        });
    }, []);*/
    const deleteSketch = useCallback(async (name: string) => {
        await RemoteStorage.deleteSketch(name);
    }, []);
    const loadContent = RemoteStorage.getSketch;
    return [sketchs, RemoteStorage.saveSketch, deleteSketch, loadContent];
}
