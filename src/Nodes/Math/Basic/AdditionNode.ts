import { IconPlus } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { PortTypeDefinitions, portTypesWithProperty } from "../../../Types/PortTypeDefinitions";
import { createVector2 } from "../../../Types/vectorDataType";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";

export const AdditionNode: NodeDefinition = {
  id: "Math/Basic/Addition",
  description: "Add two value together",
  icon: IconPlus,
  featureLevel: 100,
  alias: "Plus Addition",
  tags: ["Math", "Vector"],
  dataInputs: [
    {
      id: "a",
      type: "vector2",
      defaultValue: createVector2(),
    },
    {
      id: "b",
      type: "vector",
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

  codeBlockType: "expression",
  settings: [],
  ...changeTypeGenerator(portTypesWithProperty("additionOperator"), ["a", "b"], ["out"]),
  getData: (portId, nodeData, context) => {
    var a = context.getInputValue(nodeData, "a", nodeData.selectedType);
    var b = context.getInputValue(nodeData, "b", nodeData.selectedType);
    const operator = PortTypeDefinitions[nodeData.selectedType].additionOperator;
    return operator ? operator(a, b) : PortTypeDefinitions[nodeData.selectedType].createDefaultValue();
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["a", "b"], ({ a, b }) => `${a} + ${b}`);
  },
};
