import { IconEaseInOut } from "@tabler/icons-react";
import { Easing } from "../../libs/easing";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const EasingNode: NodeDefinition = {
  id: "Easing",
  tags: ["Math"],
  icon: IconEaseInOut,
  description: "Apply one of the standard easing function to a number .",
  dataInputs: [{ id: "input", type: "number", defaultValue: 0 }],
  dataOutputs: [{ id: "result", type: "number", defaultValue: 0 }],
  executeOutputs: [],

  settings: [
    {
      id: "easing",
      type: "dropdown",
      defaultValue: "easeInOutQuad",
      options: Object.keys(Easing),
    },
  ],

  getData: (portId, nodeData, context) => {
    var input = context.getInputValueNumber(nodeData, "input");
    var funcName = nodeData.settings.easing as string;
    var func = (Easing as any)[funcName];
    if (func !== undefined) {
      return func(input);
    } else {
      return input;
    }
  },
};
