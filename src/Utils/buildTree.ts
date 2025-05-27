import { PathNode } from "../Data/PathNode";

export function buildTreeFromPath<T>(paths: Record<string, T>, modifier: ((s: string) => string) | undefined): PathNode<T> {
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
