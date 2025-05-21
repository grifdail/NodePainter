import { IconAssembly } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortTypeArray } from "../../Types/PortType";
import { createColor } from "../../Types/vectorDataType";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";

export const Select: NodeDefinition = {
  id: "Select",
  description: "Select one of the option based on the index",
  icon: IconAssembly,
  tags: ["Control"],
  dataInputs: [
    {
      id: "test",
      type: "bool",
      defaultValue: 0,
    },
    {
      id: "when-true",
      type: "color",
      defaultValue: createColor(),
    },
    {
      id: "when-false",
      type: "color",
      defaultValue: createColor(),
    },
  ],
  dataOutputs: [{ id: "out", defaultValue: createColor(), type: "color" }],

  settings: [],
  availableTypes: PortTypeArray,
  onChangeType: changeTypeGenerator(["when-true", "when-false"], ["out"]),
  getData: (portId, node, context) => {
    const index = context.getInputValueBoolean(node, "test");
    return context.getInputValue(node, index ? "when-true" : "when-false", node.selectedType);
  },
};
