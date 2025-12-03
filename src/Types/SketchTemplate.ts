import { SketchData } from "./SketchData";

export type SketchSave = SketchData & {
  editedGraph: string;
  version?: number;
};


