import { NodeDefinition } from "../../Types/NodeDefinition";
import { AllTypes } from "../../Types/PortType";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";
import { IconEqual } from "@tabler/icons-react";

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
  availableTypes: AllTypes,
  onChangeType: changeTypeGenerator(["value"], ["out"]),
  getData: (portId, nodeData, context) => {
    return context.getInputValue(nodeData, "value", nodeData.selectedType);
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["value"], ({ value }) => `${value}`);
  },
};
