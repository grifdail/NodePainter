import { IconLine } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createColor, createVector2 } from "../../Types/vectorDataType";
import { toP5Color } from "../../Utils/math/colorUtils";

export const DrawLine: NodeDefinition = {
  id: "DrawLine",
  label: "Draw Line",
  description: "Draw a line between two point",
  icon: IconLine,
  tags: ["Drawing"],
  dataInputs: [
    {
      id: "color",
      type: "color",
      defaultValue: createColor(1, 1, 1),
    },
    {
      id: "start",
      type: "vector2",
      defaultValue: createVector2(10, 10),
    },
    {
      id: "end",
      type: "vector2",
      defaultValue: createVector2(90, 90),
    },
    {
      id: "lineWidth",
      type: "number",
      defaultValue: 10,
    },
  ],
  dataOutputs: [Port.drawing2d("out")],
  settings: [],
  getData(portId, node, context) {
    var color = context.getInputValueColor(node, "color");
    var p1 = context.getInputValueVector(node, "start") as [number, number, number];
    var p2 = context.getInputValueVector(node, "end") as [number, number, number];
    var lineWidth = context.getInputValueNumber(node, "lineWidth");

    return () => {
      context.target.stroke(toP5Color(color, context.p5));
      context.target.strokeWeight(lineWidth);
      context.target.line(...p1, ...p2);
    };
  },
};
