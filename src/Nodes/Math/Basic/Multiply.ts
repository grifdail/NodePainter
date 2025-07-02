import { IconX } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { PortTypeDefinitions, portTypesWithProperty } from "../../../Types/PortTypeDefinitions";
import { createVector2 } from "../../../Types/vectorDataType";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";

export const Multiply: NodeDefinition = {
  id: "Math/Basic/Multiplication",
  description: "Scale each component of two vector together",
  alias: "Times Multiply",
  icon: IconX,
  featureLevel: 100,
  tags: ["Math", "Vector"],
  dataInputs: [
    {
      id: "a",
      type: "vector2",
      defaultValue: createVector2(1, 1),
    },
    {
      id: "b",
      type: "vector2",
      defaultValue: createVector2(1, 1),
    },
  ],
  dataOutputs: [
    {
      id: "out",
      type: "vector2",
      defaultValue: createVector2(1, 1),
    },
  ],

  settings: [],
  ...changeTypeGenerator(portTypesWithProperty("multiplicationOperator"), ["a", "b"], ["out"]),
  getData: (portId, nodeData, context) => {
    var a = context.getInputValue(nodeData, "a", nodeData.selectedType);
    var b = context.getInputValue(nodeData, "b", nodeData.selectedType);
    const operator = PortTypeDefinitions[nodeData.selectedType].multiplicationOperator;
    return operator ? operator(a, b) : PortTypeDefinitions[nodeData.selectedType].createDefaultValue();
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["a", "b"], ({ a, b }) => `${a} * ${b}`);
  },
};
