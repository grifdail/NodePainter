import { IconColorFilter } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Gradient, createColor, createDefaultGradient } from "../../Types/vectorDataType";
import { createPortConnection } from "../../Utils/createPortConnection";

export const GenerateGradient: NodeDefinition = {
  id: "GenerateGradient",
  label: "Generate Gradient",
  description: "Create a gradient from dynamics color",
  icon: IconColorFilter,
  tags: ["Color"],
  dataInputs: [
    { id: "color-0", type: "color", defaultValue: createColor() },
    { id: "pos-0", type: "number", defaultValue: 0 },
    { id: "color-1", type: "color", defaultValue: createColor(0, 0, 0) },
    { id: "pos-1", type: "number", defaultValue: 1 },
  ],
  dataOutputs: [{ id: "gradient", type: "gradient", defaultValue: createDefaultGradient() }],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    var list: Gradient = [];
    for (let i = 0; i < 10; i++) {
      if (nodeData.dataInputs[`color-${i}`] && nodeData.dataInputs[`pos-${i}`]) {
        list.push({
          pos: context.getInputValueNumber(nodeData, `pos-${i}`),
          color: context.getInputValueColor(nodeData, `color-${i}`),
        });
      }
    }
    list.sort((a, b) => a.pos - b.pos);
    return list;
  },
  contextMenu: {
    "Add color": (node) => {
      var count = Object.keys(node.dataInputs).length / 2;
      if (count > 10) {
        return;
      }
      var keyColor = `color-${count}`;
      node.dataInputs[keyColor] = createPortConnection({
        id: keyColor,
        type: "color",
        defaultValue: createColor(1, 1, 1),
      });
      var keyPos = `pos-${count}`;
      node.dataInputs[keyPos] = createPortConnection({
        id: keyPos,
        type: "number",
        defaultValue: 0.5,
      });
    },
    "Remove last color": (node) => {
      var count = Object.keys(node.dataInputs).length / 2;
      if (count <= 2) {
        return;
      }
      var keyColor = `color-${count - 1}`;
      var keyPos = `pos-${count - 1}`;
      delete node.dataInputs[keyColor];
      delete node.dataInputs[keyPos];
    },
  },
};
