import { SketchTemplate } from "../../../Types/SketchTemplate";

type UpgradeFunction = (sketch: SketchTemplate) => SketchTemplate;

const UPGRADES: UpgradeFunction[] = [
  (sketch) => {
    return redefineNodes(
      {
        //
        ArrayFirst: "Array/First",
        ArrayConcat: "Array/Concat",
        Count: "Array/Count",
        Shuffle: "Array/Shuffle",
        ArrayReplace: "Array/Replace",
        ArrayRemoveAt: "Array/RemoveAt",
        ["Array Map"]: "Array/Map",
        ArrayLast: "Array/Last",
        ArrayInvert: "Array/Invert",
        ArrayAppend: "Array/Append",
        ArrayAgreggate: "Array/Agreggate",
        Filter: "Array/Filter",
        SelectFromArray: "Array/Select",
        Slice: "Array/Slice",
        Sum: "Array/Sum",
        RandomFromArray: "Array/Random",
        GenerateArray: "Array/Generate",
        StaticArray: "Array/Static",
      },
      sketch
    );
  },
];

export const SAVE_VERSION = UPGRADES.length;

export function upgradeTemplate(sketch: SketchTemplate) {
  var templateVersion = sketch.version || 0;
  if (templateVersion === SAVE_VERSION) {
    return sketch;
  }
  if (templateVersion > SAVE_VERSION) {
    throw new Error("Sketch is incompatible with this version of node painter. Please upgrade node Painter");
  }
  for (var i = templateVersion; i < UPGRADES.length; i++) {
    sketch = UPGRADES[i](sketch);
  }
  return sketch;
}

function redefineNodes(newIds: { [key: string]: string }, sketch: SketchTemplate): SketchTemplate {
  Object.values(sketch.nodes).forEach((node) => {
    if (newIds[node.type]) {
      node.type = newIds[node.type];
    }
  });
  return sketch;
}
