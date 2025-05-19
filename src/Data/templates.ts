import { NodeCollection } from "../Types/NodeCollection";
import { NodeDefinition } from "../Types/NodeDefinition";
import { PathNode } from "./PathNode";

const data = import.meta.glob("../Examples/**/*.json");

export type SketchTemplate = {
  nodes: NodeCollection;
  customNodes: { [key: string]: NodeDefinition };
  editedGraph?: string;
  globalSettings?: { [key: string]: any };
};

type TemplateLibrary = PathNode<() => Promise<SketchTemplate>>;

export const Templates: TemplateLibrary = buildTree<() => Promise<SketchTemplate>>(data as any, (s) => s.replace(".json", "")).children[".."].children["Examples"];

function buildTree<T>(paths: Record<string, T>, modifier: ((s: string) => string) | undefined): PathNode<T> {
  var root: PathNode<T> = { children: {}, value: null };

  Object.keys(paths).forEach((p) => {
    var parts = p.split("/");
    let parent = root;
    while (parts.length > 0) {
      var first = modifier ? modifier(parts.shift() as string) : parts.shift();
      if (first === undefined) {
        break;
      }
      if (!parent.children[first]) {
        parent.children[first] = { children: {}, value: null };
      }
      parent = parent.children[first];
    }
    parent.value = paths[p];
  });
  return root;
}
