import { IconCircuitSwitchOpen } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortType } from "../../Types/PortType";
import { Port } from "../../Types/PortTypeGenerator";
import { Vector } from "../../Types/vectorDataType";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";
import { updateAndReadPreviousFromCache } from "../../Utils/useCache";
import { VectorAbsolute, VectorSubstraction } from "../../Utils/vectorUtils";

const compareVector = function (a: any, b: any): boolean {
  const av = a as Vector;
  const bv = b as Vector;
  return VectorAbsolute(VectorSubstraction(av, bv)).every((v) => {
    return v < Number.EPSILON;
  });
};

const compareArray = (comparator: (a: any, b: any) => boolean) => {
  return (a: any[], b: any[]) => {
    return a.length == b.length && a.every((aa, i) => comparator(a[i], b[i]));
  };
};

const defaultEqualt = (a: any, b: any) => a === b;

const Comparator: { [key in PortType]: null | ((a: any, b: any) => boolean) } = {
  number: (a, b) => Math.abs(a - b) < Number.EPSILON,
  string: defaultEqualt,
  execute: null,
  vector: compareVector,
  vector2: compareVector,
  vector3: compareVector,
  vector4: compareVector,
  color: compareVector,
  bool: defaultEqualt,
  image: null,
  gradient: null,
  material: null,
  mesh: null,
  struct: null,
  object3d: null,
  drawing2d: null,
  "array-string": compareArray(defaultEqualt),
  "array-number": compareArray((a, b) => Math.abs(a - b) < Number.EPSILON),
  "array-vector": compareArray(compareVector),
  "array-vector2": compareArray(compareVector),
  "array-vector3": compareArray(compareVector),
  "array-vector4": compareArray(compareVector),
  "array-color": compareArray(compareVector),
  "array-bool": compareArray(defaultEqualt),
  "array-image": null,
  "array-gradient": null,
  "array-material": null,
  "array-mesh": null,
  "array-struct": null,
  "array-object3d": null,
  "array-drawing2d": null,
  unknown: null,
} as const;

export const DetectChangeNode: NodeDefinition = {
  id: "DetectChange",
  label: "DetectChange",
  icon: IconCircuitSwitchOpen,
  description: "Output true only on when the input has just changed. Can be configured to only output when switch from false to true, the opposite or both",

  dataInputs: [Port.bool("in"), Port.CacheId()],
  dataOutputs: [Port.bool("out")],
  tags: ["Statefull"],
  availableTypes: Object.keys(Comparator).filter((key) => Comparator[key as PortType] !== null) as PortType[],
  onChangeType: changeTypeGenerator(["in"], []),
  settings: [],
  getData(portId, node, context) {
    const current = context.getInputValue(node, "in", node.selectedType);
    const previous = updateAndReadPreviousFromCache(context, node, current);
    const comparator = Comparator[node.selectedType];
    if (comparator && !comparator(current, previous)) {
      return true;
    }
    return false;
  },
};
