import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { EnforceGoodType } from "../../Data/vectorUtils";
import { VectorTypesFull } from "../../Data/NodeDefinition";
import { changeTypeGenerator } from "../../Data/changeTypeGenerator";
import { genShader } from "../../Data/genShader";

export const Round: NodeDefinition = {
  id: "Round",
  description: "Round down a number to the nearest interger.",
  icon: IconMathFunction,
  tags: ["Math", "Vector"],
  dataInputs: [
    {
      id: "input",
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
  onChangeType: changeTypeGenerator(["input"], ["out"]),
  getData: (portId, nodeData, context) => {
    var a = context.getInputValueVector(nodeData, "input");
    return EnforceGoodType(
      nodeData,
      a.map((value) => Math.round(value))
    );
  },
  getShaderCode(node, context) {
    return genShader(node, context, "out", ["input"], ({ input }) => `sign(${input})*floor(abs(${input})+0.5);`);
  },
};
