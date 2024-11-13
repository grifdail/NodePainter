import { IconEaseInOut } from "@tabler/icons-react";
import { EasingFunctionType, evaluate } from "../../libs/easing";
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
      type: "easing-preview",
      defaultValue: "Linear",
      target: "easing",
    },
  ],

  getData: (portId, nodeData, context) => {
    var input = context.getInputValueNumber(nodeData, "input");
    var funcName = nodeData.settings.easing as EasingFunctionType;
    console.log(funcName);
    return evaluate(funcName, input);
  },
};
