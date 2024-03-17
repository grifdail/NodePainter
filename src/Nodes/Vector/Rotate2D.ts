import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { Vector3, createVector2, createVector3 } from "../../Data/vectorDataType";
import { createPortConnection } from "../../Data/createPortConnection";
import { VectorComponentOperation, VectorIsZero } from "../../Data/vectorUtils";
import { VectorScale } from "./Scale";
import { VectorNormalize } from "./Normalize";
import { VectorCrossProduct } from "./CrossProduct";
import { VectorDotProduct } from "./DotProduct";
import { convertTypeValue } from "../../Data/convertTypeValue";

export const RotateVector: NodeDefinition = {
  id: "RotateVector",
  description: "Rotate a Vector by a specific radiant",
  icon: IconArrowUpRightCircle,
  tags: ["Vector"],
  dataInputs: [
    {
      id: "vec",
      type: "vector2",
      defaultValue: createVector2(),
    },
    {
      id: "angle",
      type: "number",
      defaultValue: 1,
    },
  ],
  dataOutputs: [
    {
      id: "out",
      type: "vector2",
      defaultValue: createVector2(),
    },
  ],
  executeOutputs: [],
  settings: [],
  availableTypes: ["vector2", "vector3"],
  defaultType: "vector2",
  onChangeType(node, type) {
    if (type === "vector3") {
      node.dataInputs["vec"].ownValue = convertTypeValue(node.dataInputs["vec"].ownValue, node.dataInputs["vec"].type, type);
      node.dataInputs["vec"].type = type;
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
    node.dataOutputs["out"].type = type;
  },
  getData: (portId, nodeData, context) => {
    var a = context.getInputValueVector(nodeData, "vec");
    var b = context.getInputValueNumber(nodeData, "angle");
    var cos = Math.cos(b);
    var sin = Math.sin(b);
    if (nodeData.selectedType === "vector2") {
      return createVector2(a[0] * cos + a[1] * sin, a[0] * sin + a[1] * cos);
    } else {
      const normal = context.getInputValueVector3(nodeData, "normal");
      if (VectorIsZero(normal)) {
        return a;
      }
      const norm = VectorNormalize(normal) as Vector3;
      const p1 = VectorScale(a, cos);
      const p2 = VectorScale(VectorCrossProduct(norm, a as Vector3), sin);
      const p3 = VectorScale(norm, VectorDotProduct(norm, a) * (1 - cos));
      return VectorComponentOperation(0, (old, value) => old + value, p1, p2, p3);
    }
  },
};
