import { IconAssembly } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { createColor } from "../../Data/vectorDataType";
import { changeTypeGenerator } from "../../Data/changeTypeGenerator";
import { AllTypes } from "../../Data/NodeDefinition";

export const SwitchNode: NodeDefinition = {
  id: "Switch",
  description: "Return one of the input depending on the condition",
  icon: IconAssembly,
  tags: ["Logic"],
  dataInputs: [
    { id: "condition", type: "bool", defaultValue: false },
    { id: "true", type: "color", defaultValue: createColor(1, 1, 1, 1) },
    { id: "false", type: "color", defaultValue: createColor(0, 0, 0, 1) },
  ],
  dataOutputs: [{ id: "result", type: "color", defaultValue: createColor(0, 0, 0, 1) }],
  executeOutputs: [],
  settings: [],
  availableTypes: AllTypes,
  defaultType: "color",
  onChangeType: changeTypeGenerator(["true", "false"], ["result"]),
  getData: (portId, nodeData, context) => {
    var input = context.getInputValueBoolean(nodeData, "condition");
    if (input) {
      return context.getInputValue(nodeData, "true", nodeData.selectedType);
    } else {
      return context.getInputValue(nodeData, "false", nodeData.selectedType);
    }
  },
};
