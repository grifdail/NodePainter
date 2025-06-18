import { IconAssembly } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { changeTypeGenerator, hasInputGenerator } from "../../Utils/graph/definition/changeTypeGenerator";
import { Black, White } from "../../Utils/math/colorUtils";

export const SwitchNode: NodeDefinition = {
  id: "Switch",
  description: "Return one of the input depending on the condition",
  icon: IconAssembly,
  alias: "Select If Conditional Ternary ?",
  tags: ["Logic"],
  dataInputs: [
    { id: "condition", type: "bool", defaultValue: false },
    { id: "true", type: "color", defaultValue: Black() },
    { id: "false", type: "color", defaultValue: White() },
  ],
  dataOutputs: [{ id: "result", type: "color", defaultValue: Black() }],

  settings: [],
  availableTypes: portTypesWithTags(["common"]),
  onChangeType: changeTypeGenerator(["true", "false"], ["result"]),
  hasInput: hasInputGenerator(portTypesWithTags(["common"])),
  hasOutput: hasInputGenerator(portTypesWithTags(["common"])),
  getData: (portId, nodeData, context) => {
    var input = context.getInputValueBoolean(nodeData, "condition");
    if (input) {
      return context.getInputValue(nodeData, "true", nodeData.selectedType);
    } else {
      return context.getInputValue(nodeData, "false", nodeData.selectedType);
    }
  },
};
