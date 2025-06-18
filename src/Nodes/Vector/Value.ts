import { IconEqual } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { changeTypeGenerator, hasInputGenerator } from "../../Utils/graph/definition/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../Utils/graph/execution/generateShaderCodeFromNodeData";

export const Value: NodeDefinition = {
  id: "Value",
  description: "Represente a single value",
  icon: IconEqual,
  tags: ["Misc"],
  alias: "Constant Redirect",
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

  settings: [
    {
      type: "string",
      id: "name",
      defaultValue: "value",
      tooltip: "Doesn't have any logic, only used as commentary.",
    },
  ],
  availableTypes: portTypesWithTags(["common"]),
  onChangeType: changeTypeGenerator(["value"], ["out"]),
  hasInput: hasInputGenerator(portTypesWithTags(["common"])),
  hasOutput: hasInputGenerator(portTypesWithTags(["common"])),
  getData: (portId, nodeData, context) => {
    return context.getInputValue(nodeData, "value", nodeData.selectedType);
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["value"], ({ value }) => `${value}`);
  },
};
