import { IconX } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortTypeDefinitions, portTypesWithProperty } from "../../Types/PortTypeDefinitions";
import { createVector2 } from "../../Types/vectorDataType";
import { changeTypeGenerator, hasInputGenerator } from "../../Utils/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";

export const Multiply: NodeDefinition = {
  id: "Multiply",
  description: "Scale each component of two vector together",
  alias: "Times",
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
  availableTypes: portTypesWithProperty("multiplicationOperator"),

  onChangeType: changeTypeGenerator(["a", "b"], ["out"]),
  hasInput: hasInputGenerator(portTypesWithProperty("multiplicationOperator")),
  hasOutput: hasInputGenerator(portTypesWithProperty("multiplicationOperator")),
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
