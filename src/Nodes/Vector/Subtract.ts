import { IconMathXMinusY } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { genShader } from "../../Utils/genShader";
import { createVector2 } from "../../Types/vectorDataType";
import { VectorSubstraction } from "../../Utils/vectorUtils";
import { EnforceGoodType } from "../../Utils/vectorUtils";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";
import { VectorTypesFull } from "../../Types/PortType";

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
    return genShader(node, context, "out", ["a", "b"], ({ a, b }) => `${a} - ${b}`);
  },
};
