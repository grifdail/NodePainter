import { IconMathXMinusY } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { VectorTypesFull } from "../../Types/PortType";
import { createVector2 } from "../../Types/vectorDataType";
import { changeTypeGenerator, hasInputGenerator } from "../../Utils/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";
import { EnforceGoodType, VectorSubstraction } from "../../Utils/vectorUtils";

export const Subtract: NodeDefinition = {
  id: "Subtract",
  description: "Subtract two value together",
  icon: IconMathXMinusY,
  tags: ["Math", "Vector"],
  featureLevel: 70,
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

  settings: [],
  availableTypes: VectorTypesFull,
  onChangeType: changeTypeGenerator(["a", "b"], ["out"]),

  hasInput: hasInputGenerator(VectorTypesFull),
  hasOutput: hasInputGenerator(VectorTypesFull),
  getData: (portId, nodeData, context) => {
    var a = context.getInputValueVector(nodeData, "a");
    var b = context.getInputValueVector(nodeData, "b");
    return EnforceGoodType(nodeData, VectorSubstraction(a, b));
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["a", "b"], ({ a, b }) => `${a} - ${b}`);
  },
};
