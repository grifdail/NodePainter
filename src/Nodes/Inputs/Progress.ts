import { IconClock } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { convertToShaderValue } from "../../Utils/convertToShaderValue";

export const Progress: NodeDefinition = {
  id: "Progress",
  description: "Repressent the progress of the animation as a value between 0 and 1.",
  icon: IconClock,
  featureLevel: 100,
  tags: ["Input"],
  dataInputs: [],
  dataOutputs: [{ id: "progress", type: "number", defaultValue: 0 }],
  executeOutputs: [],
  settings: [{ id: "preview-duration", defaultValue: 1, type: "number", globalKey: "progress" }],
  getData: (portId, nodeData, context) => {
    var value = context.getGlobalSetting<number>("progress") || 1;
    return (context.time / (value * 1000)) % 1;
  },
  getShaderCode(node, context) {
    var value = context.getGlobalSetting<number>("progress") || 1;
    return `float ${context.getShaderVar(node, "progress", "number", true)} = mod(time / (${convertToShaderValue(value, "number")} * 1000.0), 1.0);`;
  },
};
