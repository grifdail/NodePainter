import { IconVectorBezier2 } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createVector2 } from "../../Types/vectorDataType";

export const EvaluateBezier: NodeDefinition = {
  id: "EvaluateBezier",
  description: "Evaluate a position on a bezier curve",
  icon: IconVectorBezier2,
  tags: ["Math"],
  dataInputs: [
    {
      id: "t",
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
  dataOutputs: [
    { id: "point", type: "vector2", defaultValue: createVector2() },
    { id: "tangent", type: "vector2", defaultValue: createVector2() },
  ],

  codeBlockType: "expression",
  settings: [],

  getData: (portId, data, context) => {
    var t = context.getInputValueNumber(data, "t");
    var start = context.getInputValueVector(data, "start");
    var p1 = context.getInputValueVector(data, "cp1");
    var p2 = context.getInputValueVector(data, "cp2");
    var end = context.getInputValueVector(data, "end");
    if (portId === "point") {
      return createVector2(context.p5.bezierPoint(start[0], p1[0], p2[0], end[0], t), context.p5.bezierPoint(start[1], p1[1], p2[1], end[1], t));
    }
    if (portId === "tangent") {
      return createVector2(context.p5.bezierTangent(start[0], p1[0], p2[0], end[0], t), context.p5.bezierTangent(start[1], p1[1], p2[1], end[1], t));
    }
  },
};
