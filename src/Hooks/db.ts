import Dexie, { Table } from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import { useCallback } from "react";
import { SKETCH_DEFAULT_NAME } from "../Nodes/StartNode";
import { ExportedCustomFunction } from "../Types/ExportedCustomFunction";
import { SketchTemplate } from "../Types/SketchTemplate";
import { useDialog } from "./useDialog";
import { toastError, toastSuccess } from "./useToast";
import { useTree } from "./useTree";

export interface Sketch {
  name: string;
  content: string;
}
export interface SavedFunctions {
  name: string;
  content: string;
  description: string;
}

export class NodepainterDexie extends Dexie {
  sketchs!: Table<Sketch>;
  functions!: Table<SavedFunctions>;

  constructor() {
    super("myDatabase");
    this.version(2).stores({
      sketchs: "&name, content", // Primary key and indexed props
      functions:
        "&name, content, description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       ", // Primary key and indexed props
    });
  }
}

export const db = new NodepainterDexie();

export function useAllSavedSketch(): [Sketch[] | undefined, (name: string, sketchData: SketchTemplate) => void, (name: string) => void] {
  const sketchs = useLiveQuery(() => db.sketchs.toArray());
  const saveSketch = useCallback((name: string, sketchData: SketchTemplate) => {
    db.sketchs.put({
      name,
      content: JSON.stringify(sketchData),
    });
  }, []);
  const deleteSketch = useCallback((name: string) => {
    db.sketchs.delete(name);
  }, []);
  return [sketchs, saveSketch, deleteSketch];
}

export function useAllSavedFunction(): [Sketch[] | undefined, (name: string, functionData: ExportedCustomFunction) => void] {
  const functions = useLiveQuery(() => db.functions.toArray());
  const saveFunction = useCallback((name: string, functionData: ExportedCustomFunction) => {
    const def = functionData.definitions.find((def) => def.id === name);
    db.functions.put({
      name,
      content: JSON.stringify(functionData),
      description: def?.description as string,
    });
  }, []);
  return [functions, saveFunction];
}

export function saveSketchWithNamePrompt(saveSketch: (name: string, content: SketchTemplate) => void) {
  var tree = useTree.getState();
  const name = tree.getSketchName();
  if (name === SKETCH_DEFAULT_NAME) {
    useDialog.getState().openPrompt(
      (name) => {
        tree.setSketchName(name);
        //Using a timeout because setSketchName is asynchronous and i can't be bothered to wait do it properly. If i don't the exported tree might have the wrong name.
        setTimeout(() => {
          const content = useTree.getState().exportTemplate();
          try {
            saveSketch(name, content);
            toastSuccess("Sketch saved !");
          } catch {
            toastError("Something went wrong with your save");
          }
        }, 100);
      },
      "Save Sketch",
      "What name do you want to give your sketch ?",
      name
    );
  } else {
    const content = tree.exportTemplate();
    try {
      saveSketch(name, content);
      toastSuccess("Sketch saved !");
    } catch {
      toastError("Something went wrong with your save");
    }
  }
}
