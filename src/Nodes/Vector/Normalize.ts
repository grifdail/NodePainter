import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { genShader } from "../../Data/genShader";
import { Vector, createVector2 } from "../../Data/vectorDataType";
import { VectorMagnitude } from "../../Data/vectorUtils";
import { EnforceGoodType } from "../../Data/vectorUtils";
import { changeTypeGenerator } from "../../Data/changeTypeGenerator";
import { VectorTypeslimited } from "../../Data/NodeDefinition";

export const Normalize: NodeDefinition = {
  id: "Normalize",
  description: "Return a vector sharing the same direction but with a length of one",
  icon: IconArrowUpRightCircle,
  tags: ["Vector"],
  dataInputs: [
    {
      id: "vec",
      type: "vector2",
      defaultValue: createVector2(),
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
  defaultType: "vector2",
  availableTypes: VectorTypeslimited,
  onChangeType: changeTypeGenerator(["vec"], ["out"]),
  getData: (portId, nodeData, context) => {
    const a = context.getInputValueVector(nodeData, "vec");
    const vec = VectorNormalize(a);
    return EnforceGoodType(nodeData, vec);
  },
  getShaderCode(node, context) {
    return genShader(node, context, "out", ["vec"], ({ vec }) => `normalize(${vec})`);
  },
};
export function VectorNormalize(a: Vector): number[] {
  const length = VectorMagnitude(a);
  const vec = a.map((comp) => comp / length);
  return vec;
}
