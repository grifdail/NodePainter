import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { EnforceGoodType, VectorTypesFull } from "../../Data/vectorUtils";
import { changeTypeGenerator } from "../../Data/changeTypeGenerator";
import { genShader } from "../../Data/genShader";

export const Ceil: NodeDefinition = {
  id: "Ceil",
  description: "Round up a number to the smallest interger larger or equal to itself.",
  icon: IconMathFunction,
  tags: ["Math", "Vector"],
  dataInputs: [
    {
      id: "in",
      type: "number",
      defaultValue: 0,
    },
  ],
  dataOutputs: [
    {
      id: "out",
      type: "number",
      defaultValue: 0,
    },
  ],
  executeOutputs: [],
  settings: [],
  defaultType: "number",
  availableTypes: VectorTypesFull,
  onChangeType: changeTypeGenerator(["in"], ["out"]),
  getData: (portId, nodeData, context) => {
    var a = context.getInputValueVector(nodeData, "in");
    return EnforceGoodType(
      nodeData,
      a.map((value) => Math.ceil(value))
    );
  },
  getShaderCode(node, context) {
    return genShader(node, context, "vec4", "out", ["in"], ([a, b]) => `ceil(${a})`);
  },
};
