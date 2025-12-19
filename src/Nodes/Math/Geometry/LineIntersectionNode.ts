import { IconLine, IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { createVector2, Vector2 } from "../../../Types/vectorDataType";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { vector2Perpendicular, vectorAddition, vectorDotProduct, vectorScale, vectorSubstraction } from "../../../Utils/math/vectorUtils";

export const LineIntersectionNode: NodeDefinition = {
  id: "Math/Geometry/LineIntersection",
  alias: "Line Intersection",
  description: "Find the intersection point if any, between two line segment",
  icon: IconLine,
  featureLevel: 50,
  tags: ["Math"],
  dataInputs: [
    Port.vector2("start1", createVector2(0, 0)),
    Port.vector2("end1", createVector2(400, 400)),
    Port.vector2("start2", createVector2(400, 0)),
    Port.vector2("end2", createVector2(0, 400)),

  ],
  dataOutputs: [
    Port.vector2("point"),
    Port.bool("intersect"),
  ],
  settings: [],
  codeBlockType: "expression",
  getData: (portId, nodeData, context) => {
    const start1 = context.getInputValueVector2(nodeData, "start1");
    const start2 = context.getInputValueVector2(nodeData, "start2");
    const end1 = context.getInputValueVector2(nodeData, "end1");
    const end2 = context.getInputValueVector2(nodeData, "end2");
    var result = LineIntersectionNode.fn?.(start1, end1, end1, end2) || { point: createVector2(), intersect: false };

    return result[portId];

  },
  fn: (start1: Vector2, end1: Vector2, start2: Vector2, end2: Vector2) => {
    let v1 = vectorSubstraction(end1, start1) as Vector2;
    let v2 = vectorSubstraction(end2, start2) as Vector2;
    let v3 = vectorSubstraction(start2, start1) as Vector2;
    let v4 = vector2Perpendicular(v1);
    let v5 = vector2Perpendicular(v2);
    let t = vectorDotProduct(v3, v5) / vectorDotProduct(v1, v5);
    let u = -vectorDotProduct(v3, v4) / vectorDotProduct(v2, v4);

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      let v = vectorScale(v1, t);
      return {
        point: vectorAddition(start1, v),
        intersect: true
      };
    } else {
      return {
        point: createVector2(),
        intersect: false
      };;
    }
  },
};
