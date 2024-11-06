import { IconMinus, IconPlus, IconPolygon } from "@tabler/icons-react";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createColor, createVector2 } from "../../Types/vectorDataType";
import { toP5Color } from "../../Utils/colorUtils";
import { createPortConnection } from "../../Utils/createPortConnection";

const addCorner = (node: NodeData) => {
  const count = Object.keys(node.dataInputs).length;
  const key = `corner-${count}`;
  node.dataInputs[key] = createPortConnection({
    id: key,
    type: "vector2",
    defaultValue: createVector2(),
  });
};
const removeCorner = (node: NodeData) => {
  const count = Object.keys(node.dataInputs).length - 1;
  const key = `corner-${count}`;
  delete node.dataInputs[key];
};

export const DrawPolygon: NodeDefinition = {
  id: "DrawPolygon",
  label: "Draw Polygon",
  description: "Draw a polygon with up to 20 points",
  icon: IconPolygon,
  tags: ["Draw"],
  dataInputs: [
    {
      id: "color",
      type: "color",
      defaultValue: createColor(),
    },
    {
      id: "corner-1",
      type: "vector2",
      defaultValue: createVector2(25, 0),
    },
    {
      id: "corner-2",
      type: "vector2",
      defaultValue: createVector2(0, 0),
    },
    {
      id: "corner-3",
      type: "vector2",
      defaultValue: createVector2(0, 25),
    },
  ],
  dataOutputs: [],
  executeOutputs: [],
  settings: [
    {
      id: "buttons",
      type: "buttons",
      defaultValue: undefined,
      buttons: [
        {
          label: null,
          icon: IconMinus,
          onClick: removeCorner,
        },
        {
          label: null,
          icon: IconPlus,
          onClick: addCorner,
        },
      ],
    },
  ],
  canBeExecuted: true,
  execute: (data, context) => {
    const color = context.getInputValueColor(data, "color");
    context.target.fill(toP5Color(color, context.p5));
    context.target.noStroke();
    context.target.beginShape();
    for (let i = 1; i < 20; i++) {
      const key = `corner-${i}`;
      if (data.dataInputs[key]) {
        const p = context.getInputValueVector(data, key);
        context.target.vertex(p[0], p[1]);
      }
    }
    context.target.endShape();
  },
  contextMenu: {
    "Add corner": addCorner,
    "Remove corner": removeCorner,
  },
};
