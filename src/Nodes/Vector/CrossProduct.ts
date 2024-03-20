import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";
import { Vector3, createVector3 } from "../../Types/vectorDataType";

export const CrossProduct: NodeDefinition = {
  id: "CrossProduct",
  description: "Return the dot product of two vector",
  icon: IconArrowUpRightCircle,
  tags: ["Vector"],
  dataInputs: [
    {
      id: "a",
      type: "vector2",
      defaultValue: createVector3(),
    },
    {
      id: "b",
      type: "vector2",
      defaultValue: createVector3(),
    },
  ],
  dataOutputs: [
    {
      id: "out",
      type: "vector3",
      defaultValue: createVector3(),
    },
  ],
  executeOutputs: [],
  settings: [],
  defaultType: "vector3",
  getData: (portId, nodeData, context) => {
    var a = context.getInputValueVector3(nodeData, "a");
    var b = context.getInputValueVector3(nodeData, "b");
    return VectorCrossProduct(a, b);
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "dot", ["a", "b"], ({ a, b }) => `dot(${a}, ${b})`);
  },
};
export function VectorCrossProduct(a: Vector3, b: Vector3): Vector3 {
  const x = a[1] * b[2] - a[2] * b[1];
  const y = a[2] * b[0] - a[0] * b[2];
  const z = a[0] * b[1] - a[1] * b[0];
  return createVector3(x, y, z);
}
