import { IconColorFilter } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { createColor } from "../../Data/vectorDataType";

export const SetAlpha: NodeDefinition = {
  id: "SetAlpha",
  label: "Set Alpha",
  description: "Set the transparency of a color",
  icon: IconColorFilter,
  tags: ["Color"],
  dataInputs: [
    { id: "color", type: "color", defaultValue: createColor(1, 1, 1, 1) },
    { id: "alpha", type: "number", defaultValue: 0 },
  ],
  dataOutputs: [{ id: "color", type: "color", defaultValue: 1 }],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    const color = context.getInputValueColor(nodeData, "color");
    const alpha = context.getInputValueNumber(nodeData, "alpha");
    return [color[0], color[1], color[2], alpha];
  },
  getShaderCode(node, context) {
    return `vec4 ${context.getShaderVar(node, "color", true)} = vec4(${context.getShaderVar(node, "color")}.rgb,  ${context.getShaderVar(node, "alpha")});`;
  },
};
