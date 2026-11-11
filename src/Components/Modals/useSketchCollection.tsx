import { Templates } from "../../Data/templates";
import { useAllSavedSketch } from "../../Hooks/db";
import { SketchSave } from "../../Types/SketchTemplate";
import { useRemoteStorage } from "../../Hooks/useRemoteStorage";
import { SketchElement, MY_SAVED_SKETCH, MY_ONLINE_SKETCH } from "./SketchModal";

export function useSketchCollection(): [SketchElement[], string[]] {
    const [localSketches, , deleteLocalSketch] = useAllSavedSketch();
    const { sketchs: remotesSketches, deleteSketch: deleteRemoteSketch, getSketchContent } = useRemoteStorage();
    const tags = new Set([MY_SAVED_SKETCH, MY_ONLINE_SKETCH]);
    return [
        [
            ...Object.entries(Templates)
                .filter(([name]) => name[0] !== "_")
                .flatMap(([folderName, content]) => {
                    tags.add(folderName);
                    return Object.entries(content)
                        .filter(([name]) => name[0] !== "_")
                        .map(([fileName, content]) => ({
                            name: fileName,
                            time: 0,
                            category: folderName,
                            content: content,
                        }));
                }),
            ...(localSketches || []).map((sketch) => {
                return {
                    name: sketch.name,
                    time: 0,
                    category: MY_SAVED_SKETCH,
                    delete: deleteLocalSketch,
                    content: () => new Promise<SketchSave>((r) => r(JSON.parse(sketch.content))),
                };
            }),
            ...(remotesSketches || []).map((sketch) => {
                return {
                    name: sketch.name,
                    time: sketch.time,
                    category: MY_ONLINE_SKETCH,
                    delete: () => deleteRemoteSketch(sketch.name),
                    content: () => getSketchContent(sketch.name),
                };
            }),
        ],
        Array.from(tags),
    ];
}
