import { IconMinus } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { PortTypeDefinitions, portTypesWithProperty } from "../../../Types/PortTypeDefinitions";
import { createVector2 } from "../../../Types/vectorDataType";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";

export const Subtract: NodeDefinition = {
  id: "Math/Basic/Subtraction",
  description: "Subtract two value together",
  icon: IconMinus,
  tags: ["Math", "Vector"],
  alias: "Minus",
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
  ...changeTypeGenerator(portTypesWithProperty("subtractionOperator"), ["a", "b"], ["out"]),
  getData: (portId, nodeData, context) => {
    var a = context.getInputValue(nodeData, "a", nodeData.selectedType);
    var b = context.getInputValue(nodeData, "b", nodeData.selectedType);
    const operator = PortTypeDefinitions[nodeData.selectedType].subtractionOperator;
    return operator ? operator(a, b) : PortTypeDefinitions[nodeData.selectedType].createDefaultValue();
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["a", "b"], ({ a, b }) => `${a} - ${b}`);
  },
};
