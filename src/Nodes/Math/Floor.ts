import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { EnforceGoodType, VectorTypesFull } from "../../Data/vectorUtils";
import { changeTypeGenerator } from "../../Data/changeTypeGenerator";
import { genShader } from "../../Data/genShader";

export const Floor: NodeDefinition = {
  id: "Floor",
  description: "Round down a number to the largest interger smaller or equal to itself.",
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
      a.map((value) => Math.floor(value))
    );
  },
  getShaderCode(node, context) {
    return genShader(node, context, "vec4", "out", ["in"], ([a, b]) => `floor(${a})`);
  },
};
