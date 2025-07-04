import { IconVectorBezier2 } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { Vector3, createVector2 } from "../../Types/vectorDataType";
import { toP5Color } from "../../Utils/math/colorUtils";

export const BezierNode: NodeDefinition = {
  id: "Draw/Bezier",
  label: "Draw Bezier curve",
  description: "Draw a bezier curve, from start to end, with control point cp1 and cp2",
  icon: IconVectorBezier2,
  tags: ["Drawing"],
  dataInputs: [
    {
      id: "color",
      type: "color",
      defaultValue: "#aaaaaa",
    },
    {
      id: "lineWidth",
      type: "number",
      defaultValue: 10,
    },
    {
      id: "start",
      type: "vector2",
      defaultValue: createVector2(100, 200),
    },
    {
      id: "cp1",
      type: "vector2",
      defaultValue: createVector2(200, 100),
    },
    {
      id: "cp2",
      type: "vector2",
      defaultValue: createVector2(200, 300),
    },
    {
      id: "end",
      type: "vector2",
      defaultValue: createVector2(300, 200),
    },
  ],
  dataOutputs: [Port.drawing2d("out")],

  settings: [],
  getData(portId, node, context) {
    const color = context.getInputValueColor(node, "color");
    const size = context.getInputValueNumber(node, "lineWidth");
    const start = context.getInputValueVector(node, "start") as Vector3;
    const p1 = context.getInputValueVector(node, "cp1") as Vector3;
    const p2 = context.getInputValueVector(node, "cp2") as Vector3;
    const end = context.getInputValueVector(node, "end") as Vector3;

    return () => {
      context.target.noFill();
      context.target.stroke(toP5Color(color, context.p5));
      context.target.strokeWeight(size);
      context.target.bezier(...start, ...p1, ...p2, ...end);
    };
  },
};
