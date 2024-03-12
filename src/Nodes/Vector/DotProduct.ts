import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { genShader } from "../../Data/genShader";
import { createVector2 } from "../../Data/vectorDataType";
import { zipVector } from "../../Data/vectorUtils";
import { changeTypeGenerator } from "../../Data/changeTypeGenerator";
import { VectorTypeslimited } from "../../Data/vectorUtils";

export const DotProduct: NodeDefinition = {
  id: "DotProduct",
  description: "Return the dot product of two vector",
  icon: IconArrowUpRightCircle,
  tags: ["Vector"],
  dataInputs: [
    {
      id: "a",
      type: "vector2",
      defaultValue: createVector2(),
    },
    {
      id: "b",
      type: "vector2",
      defaultValue: createVector2(),
    },
  ],
  dataOutputs: [
    {
      id: "dot",
      type: "number",
      defaultValue: 0,
    },
  ],
  executeOutputs: [],
  settings: [],
  defaultType: "vector2",
  availableTypes: VectorTypeslimited,
  onChangeType: changeTypeGenerator(["a", "b"], ["dot"]),
  getData: (portId, nodeData, context) => {
    var a = context.getInputValueVector(nodeData, "a");
    var b = context.getInputValueVector(nodeData, "b");
    return VectorDotProduct(a, b);
  },
  getShaderCode(node, context) {
    return genShader(node, context, "dot", ["a", "b"], ({ a, b }) => `dot(${a}, ${b})`);
  },
};
export function VectorDotProduct(a: number[], b: number[]): number {
  return zipVector(a, b).reduce((sum, comp) => sum + comp[0] * comp[1], 0);
}
