import { IconList } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { VectorTypesFull } from "../../Types/PortType";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";
import { createDefaultVector } from "../../Utils/createDefaultValue";
import { EnforceGoodType, VectorAddition } from "../../Utils/vectorUtils";

export const Sum: NodeDefinition = {
  id: "Sum",
  description: "Sum up all the value in the array",
  icon: IconList,
  tags: ["Array"],
  dataInputs: [
    {
      id: "array",
      type: "array-number",
      defaultValue: [],
    },
  ],
  dataOutputs: [{ id: "out", defaultValue: 0, type: "number" }],

  settings: [],
  availableTypes: VectorTypesFull,
  onChangeType: changeTypeGenerator([], ["out"], ["array"]),
  getData: (portId, node, context) => {
    const array = context.getInputValueVectorArray(node, "array");
    return EnforceGoodType(node, array.reduce(VectorAddition, createDefaultVector(node.selectedType)));
  },
};
