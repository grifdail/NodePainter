import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Vector3, createVector2, createVector3 } from "../../Types/vectorDataType";
import { createPortConnection } from "../../Utils/createPortConnection";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";
import { VectorAddition, VectorIsZero, VectorScale } from "../../Utils/vectorUtils";
import { VectorCrossProduct } from "./CrossProduct";
import { VectorDotProduct } from "./DotProduct";
import { VectorNormalize } from "./Normalize";

export const VectorFromAngle: NodeDefinition = {
  id: "VectorFromAngle",
  description: "Create a vector based on an Angle and a magnitude",
  icon: IconArrowUpRightCircle,
  featureLevel: 4,
  tags: ["Vector"],
  dataInputs: [
    {
      id: "angle",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "length",
      type: "number",
      defaultValue: 1,
    },
  ],
  dataOutputs: [{ id: "vec", type: "vector2", defaultValue: createVector2() }],

  settings: [],
  availableTypes: ["vector2", "vector3"],
  onChangeType(node, type) {
    if (type === "vector3") {
      if (node.dataInputs["normal"] === undefined) {
        node.dataInputs["normal"] = createPortConnection({
          id: "normal",
          type: "vector3",
          defaultValue: createVector3(0, 1, 0),
        });
      }
    } else {
      delete node.dataInputs["normal"];
    }
    node.dataOutputs["vec"].type = type;
  },
  getData: (portId, nodeData, context) => {
    const angle = context.getInputValueNumber(nodeData, "angle");
    const length = context.getInputValueNumber(nodeData, "length");
    const cos = Math.cos(angle) * length;
    const sin = Math.sin(angle) * length;
    //console.log(cos * cos + sin * sin);
    if (nodeData.selectedType === "vector2") {
      return createVector2(cos, sin);
    } else {
      const normal = context.getInputValueVector3(nodeData, "normal");
      if (VectorIsZero(normal)) {
        return createVector3();
      } else {
        const norm = VectorNormalize(normal) as Vector3;
        const isUp = Math.abs(1 - VectorDotProduct(norm, [0, 1, 0])) < Number.EPSILON;
        if (isUp) {
          return createVector3(cos, 0, sin);
        } else {
          const alpha = VectorNormalize(VectorCrossProduct(norm, [0, 1, 0])) as Vector3;
          const beta = VectorNormalize(VectorCrossProduct(norm, alpha)) as Vector3;
          const vec = VectorAddition(VectorScale(alpha, cos), VectorScale(beta, sin));
          return vec;
        }
      }
    }
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "vec", ["angle", "length"], ({ angle, length }) => `vec2(cos(${angle}) * ${length}, sin(${angle}) * ${length})`);
  },
};
