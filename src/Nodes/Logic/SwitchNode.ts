import { IconAssembly } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { createColor } from "../../Data/vectorDataType";
import { changeTypeGenerator } from "../../Data/changeTypeGenerator";

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
  availableTypes: ["color", "gradient", "image", "number", "string", "vector2", "vector3", "vector4"],
  defaultType: "color",
  onChangeType: changeTypeGenerator(["true", "false"], ["result"]),
  getData: (portId, nodeData, context) => {
    var input = context.getInputValueBoolean(nodeData, "condition");
    if (input) {
      return context._getInputValue(nodeData, "true", nodeData.selectedType);
    } else {
      return context._getInputValue(nodeData, "false", nodeData.selectedType);
    }
  },
};
