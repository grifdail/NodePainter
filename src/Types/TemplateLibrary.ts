import { SketchSave } from "../Types/SketchTemplate";

export type TemplateLibrary = Record<string, Record<string, () => Promise<SketchSave>>>;
