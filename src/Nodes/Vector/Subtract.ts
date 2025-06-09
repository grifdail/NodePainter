import { IconMinus } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortTypeDefinitions, portTypesWithProperty } from "../../Types/PortTypeDefinitions";
import { createVector2 } from "../../Types/vectorDataType";
import { changeTypeGenerator, hasInputGenerator } from "../../Utils/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";

export const Subtract: NodeDefinition = {
  id: "Subtract",
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
  availableTypes: portTypesWithProperty("subtractionOperator"),
  onChangeType: changeTypeGenerator(["a", "b"], ["out"]),

  hasInput: hasInputGenerator(portTypesWithProperty("subtractionOperator")),
  hasOutput: hasInputGenerator(portTypesWithProperty("subtractionOperator")),
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
