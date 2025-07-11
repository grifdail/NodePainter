import { IconEaseInOut } from "@tabler/icons-react";
import { EasingFunctionType, evaluate } from "../../../libs/easing";
import { NodeDefinition } from "../../../Types/NodeDefinition";

export const EasingNode: NodeDefinition = {
  id: "Math/Interpolation/Easing",
  tags: ["Math"],
  icon: IconEaseInOut,
  description: "Apply one of the standard easing function to a number .",
  dataInputs: [{ id: "input", type: "number", defaultValue: 0 }],
  dataOutputs: [{ id: "result", type: "number", defaultValue: 0 }],

  settings: [
    {
      id: "easing",
      type: "easing-preview",
      defaultValue: "Linear",
    },
  ],

  getData: (portId, nodeData, context) => {
    var input = context.getInputValueNumber(nodeData, "input");
    var funcName = nodeData.settings.easing as EasingFunctionType;
    return evaluate(funcName, input);
  },
};
