import { SketchData } from "./SketchData";

export type SketchSave = SketchData & {
  editedGraph: string | undefined;
  version?: number;
};


