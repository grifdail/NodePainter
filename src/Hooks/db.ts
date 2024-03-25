import Dexie, { Table } from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import { SketchTemplate } from "../Data/templates";

export interface Sketch {
  name: string;
  content: string;
}

export class NodepainterDexie extends Dexie {
  sketchs!: Table<Sketch>;

  constructor() {
    super("myDatabase");
    this.version(1).stores({
      sketchs: "&name, content", // Primary key and indexed props
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
