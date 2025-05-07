import { IconColorFilter } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { White } from "../../Utils/colorUtils";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";

export const SetAlpha: NodeDefinition = {
  id: "SetAlpha",
  label: "Set Alpha",
  description: "Set the transparency of a color",
  icon: IconColorFilter,
  tags: ["Color"],
  dataInputs: [
    { id: "color", type: "color", defaultValue: White() },
    { id: "alpha", type: "number", defaultValue: 0 },
  ],
  dataOutputs: [{ id: "out", type: "color", defaultValue: 1 }],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    const color = context.getInputValueColor(nodeData, "color");
    const alpha = context.getInputValueNumber(nodeData, "alpha");
    return [color[0], color[1], color[2], alpha];
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["color", "alpha"], ({ color, alpha }) => `vec4(${color}.rgb, ${alpha})`);
  },
};
