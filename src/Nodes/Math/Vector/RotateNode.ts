import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { Quaternion, Vector3 } from "three";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { createVector2, createVector3 } from "../../../Types/vectorDataType";
import { createMultiTypeNodeDefinition } from "../../../Utils/graph/definition/createMultyTypeNodeDefinition";

export const RotateNode: NodeDefinition = createMultiTypeNodeDefinition(
  {
    id: "Math/Vector/Rotate",
    label: "Rotate Vector",
    description: "Rotate a Vector by a specific radiant",
    icon: IconArrowUpRightCircle,
    tags: ["Vector"],

    codeBlockType: "expression",
    settings: [],
  },
  {
    vector2: {
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
      getData: (portId, nodeData, context) => {
        var a = context.getInputValueVector(nodeData, "vec");
        var b = context.getInputValueNumber(nodeData, "angle");

        var cos = Math.cos(b);
        var sin = Math.sin(b);
        return createVector2(a[0] * cos + a[1] * sin, a[0] * sin + a[1] * cos);
      },
    },
    vector3: {
      dataInputs: [
        {
          id: "vec",
          type: "vector3",
          defaultValue: createVector3(),
        },
        {
          id: "rotation",
          type: "quaternion",
          defaultValue: [0, 0, 0, 1],
        },
      ],
      dataOutputs: [
        {
          id: "out",
          type: "vector3",
          defaultValue: createVector3(),
        },
      ],
      getData: (portId, nodeData, context) => {
        var vec = context.getInputValueVector(nodeData, "vec");
        var rotation = context.getInputValueQuaternion(nodeData, "rotation");
        var vecT = new Vector3(...vec).applyQuaternion(new Quaternion(...rotation));
        return [vecT.x, vecT.y, vecT.z];
      },
    },
  }
);
