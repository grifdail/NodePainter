import { IconList } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { VectorTypesFull } from "../../Types/PortType";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";
import { createDefaultValue } from "../../Utils/createDefaultValue";
import { VectorSquareDistance } from "../../Utils/vectorUtils";

export const Closest: NodeDefinition = {
  id: "Closest",
  description: "Find and return the closest element of the array",
  icon: IconList,
  tags: ["Array"],
  dataInputs: [
    {
      id: "array",
      type: "array-number",
      defaultValue: [],
    },
    {
      id: "target",
      type: "number",
      defaultValue: 0,
    },
  ],
  dataOutputs: [
    { id: "out", defaultValue: 0, type: "number" },
    { id: "index", defaultValue: 0, type: "number" },
  ],
  executeOutputs: [],
  settings: [],
  canBeExecuted: false,
  defaultType: "number",
  availableTypes: VectorTypesFull,
  onChangeType: changeTypeGenerator(["target"], ["out"], ["array"]),
  getData: (portId, node, context) => {
    const array = context.getInputValueVectorArray(node, "array");
    const target = context.getInputValueVector(node, "target");
    if (array.length === 0) {
      return createDefaultValue(node.selectedType);
    }
    let distance = Number.MAX_VALUE;
    let lastSafeItem = array[0];
    let lastSafeIndice = 0;
    array.forEach((item, i) => {
      let d = VectorSquareDistance(item, target);
      if (d < distance) {
        lastSafeItem = item;
        distance = d;
        lastSafeIndice = i;
      }
    });
    if (portId === "out") {
      return lastSafeItem;
    } else {
      return lastSafeIndice;
    }
  },
};
