import { SketchSave } from "../Types/SketchTemplate";
import { TemplateLibrary } from "../Types/TemplateLibrary";

const data = import.meta.glob("../Examples/**/*.json");

export const Templates: TemplateLibrary = Object.entries(data).reduce((old, [path, data]) => {
  var splitPath = path.split("/").slice(2);
  var folder = splitPath[0];
  if (old[folder] === undefined) {
    old[folder] = {} as Record<string, () => Promise<SketchSave>>;
  }
  old[folder][splitPath.slice(1).join("/").replace(".json", "")] = data as () => Promise<SketchSave>;
  return old;
}, {} as TemplateLibrary);
