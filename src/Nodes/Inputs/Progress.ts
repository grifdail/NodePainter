import { IconClock } from "@tabler/icons-react";
import { convertToShaderNumber } from "../../Types/convertToShaderNumber";
import { NodeData } from "../../Types/NodeData";
import { ContextMenuData, NodeDefinition } from "../../Types/NodeDefinition";
import { createPortConnection } from "../../Utils/createPortConnection";

export const Progress: NodeDefinition = {
  id: "Progress",
  description: "Repressent the progress of the animation as a value between 0 and 1.",
  icon: IconClock,
  featureLevel: 100,
  tags: ["Input"],
  dataInputs: [],
  dataOutputs: [{ id: "progress", type: "number", defaultValue: 0 }],

  settings: [{ id: "preview-duration", defaultValue: 1, type: "number", globalKey: "progress" }],
  getData: (portId, nodeData, context) => {
    var value = context.getGlobalSetting<number>("progress") || 1;
    const offset = nodeData.dataInputs["offset"] ? context.getInputValueNumber(nodeData, "offset") : 0;
    const scale = nodeData.dataInputs["scale"] ? context.getInputValueNumber(nodeData, "scale") : 1;
    return ((context.time / (value * 1000) + offset) % 1) * scale;
  },
  getShaderCode(node, context) {
    var value = context.getGlobalSetting<number>("progress") || 1;
    if (node.dataInputs["offset"]) {
      return `float ${context.getShaderVar(node, "progress", "number", true)} = mod(time / (${convertToShaderNumber(value)} * 1000.0) + ${context.getShaderVar(node, "offset", "number")}, 1.0) * ${context.getShaderVar(node, "scale", "number")};`;
    }
    return `float ${context.getShaderVar(node, "progress", "number", true)} = mod(time / (${convertToShaderNumber(value)} * 1000.0), 1.0);`;
  },
  contextMenu: (node) => {
    if (node.dataInputs["offset"]) {
      return {} as ContextMenuData;
    }
    return {
      "Use advanced option": (node: NodeData) => {
        node.dataInputs["offset"] = createPortConnection({
          id: `offset`,
          type: "number",
          defaultValue: 0,
        });
        node.dataInputs["scale"] = createPortConnection({
          id: `scale`,
          type: "number",
          defaultValue: 1,
        });
      },
    };
  },
};
