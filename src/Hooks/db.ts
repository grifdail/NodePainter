import Dexie, { Table } from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import { SketchTemplate } from "../Data/templates";
import { ExportedCustomFunction } from "../Types/ExportedCustomFunction";

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

export function useAllSavedSketch(): [Sketch[] | undefined, (name: string, sketchData: SketchTemplate) => void] {
  const sketchs = useLiveQuery(() => db.sketchs.toArray());
  const saveSketch = (name: string, sketchData: SketchTemplate) => {
    db.sketchs.put({
      name,
      content: JSON.stringify(sketchData),
    });
  };
  return [sketchs, saveSketch];
}

export function useAllSavedFunction(): [Sketch[] | undefined, (name: string, functionData: ExportedCustomFunction) => void] {
  const functions = useLiveQuery(() => db.functions.toArray());
  const saveFunction = (name: string, functionData: ExportedCustomFunction) => {
    const def = functionData.definitions.find((def) => def.id === name);
    db.functions.put({
      name,
      content: JSON.stringify(functionData),
      description: def?.description as string,
    });
  };
  return [functions, saveFunction];
}
