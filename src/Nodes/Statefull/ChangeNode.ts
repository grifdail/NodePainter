import { IconCircuitSwitchOpen } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortType } from "../../Types/PortType";
import { Port } from "../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";
import { createDefaultValue } from "../../Utils/createDefaultValue";
import { updateAndReadPreviousFromCache } from "../../Utils/useCache";
import { VectorSubstraction } from "../../Utils/vectorUtils";

const Difference: { [key in PortType]?: (a: any, b: any) => any } = {
  number: (a, b) => b - a,
  vector: VectorSubstraction,
  vector2: VectorSubstraction,
  vector3: VectorSubstraction,
  vector4: VectorSubstraction,
  color: VectorSubstraction,
  bool: (a, b) => a ^ b,
} as const;

export const ChangeNode: NodeDefinition = {
  id: "Change",
  label: "Change",
  icon: IconCircuitSwitchOpen,
  description: "Output the difference between the input value from this frame and the previous call",

  dataInputs: [Port.bool("in"), Port.CacheId()],
  dataOutputs: [Port.bool("out")],
  tags: ["Statefull"],
  availableTypes: Object.keys(Difference).filter((key) => Difference[key as PortType] !== null) as PortType[],
  onChangeType: changeTypeGenerator(["in"], ["out"]),
  settings: [],
  getData(portId, node, context) {
    const current = context.getInputValue(node, "in", node.selectedType);
    const previous = updateAndReadPreviousFromCache(context, node, current);
    const differenciator = Difference[node.selectedType];
    if (differenciator) {
      return differenciator(current, previous);
    }
    return createDefaultValue(node.selectedType);
  },
};
