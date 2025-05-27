import { SketchTemplate } from "../Types/SketchTemplate";

export type TemplateLibrary = Record<string, Record<string, () => Promise<SketchTemplate>>>;
