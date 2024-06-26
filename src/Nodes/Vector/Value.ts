import { IconEqual } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { CommonTypes } from "../../Types/PortType";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";

export const Value: NodeDefinition = {
  id: "Value",
  description: "Represente a single value",
  icon: IconEqual,
  tags: ["Misc"],
  dataInputs: [
    {
      id: "value",
      type: "number",
      defaultValue: 0,
    },
  ],
  dataOutputs: [
    {
      id: "out",
      type: "number",
      defaultValue: 0,
    },
  ],
  executeOutputs: [],
  settings: [],
  defaultType: "number",
  availableTypes: CommonTypes,
  onChangeType: changeTypeGenerator(["value"], ["out"]),
  getData: (portId, nodeData, context) => {
    return context.getInputValue(nodeData, "value", nodeData.selectedType);
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["value"], ({ value }) => `${value}`);
  },
};
