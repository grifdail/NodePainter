import { IconMathXMinusY } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { genShader } from "../../Data/genShader";
import { createVector2 } from "../../Data/vectorDataType";
import { VectorSubstraction } from "../../Data/vectorUtils";
import { EnforceGoodType } from "../../Data/vectorUtils";
import { changeTypeGenerator } from "../../Data/changeTypeGenerator";
import { VectorTypesFull } from "../../Data/vectorUtils";

export const Subtract: NodeDefinition = {
  id: "Subtract",
  description: "Subtract two value together",
  icon: IconMathXMinusY,
  tags: ["Math", "Vector"],
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
      id: "out",
      type: "vector2",
      defaultValue: createVector2(),
    },
  ],
  executeOutputs: [],
  settings: [],

  defaultType: "vector2",
  availableTypes: VectorTypesFull,
  onChangeType: changeTypeGenerator(["a", "b"], ["out"]),
  getData: (portId, nodeData, context) => {
    var a = context.getInputValueVector(nodeData, "a");
    var b = context.getInputValueVector(nodeData, "b");
    return EnforceGoodType(nodeData, VectorSubstraction(a, b));
  },
  getShaderCode(node, context) {
    return genShader(node, context, "vec4", "out", ["a", "b"], ([a, b]) => `${a} - ${b}`);
  },
};
