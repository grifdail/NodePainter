import { IconMathXDivideY } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortTypeDefinitions, portTypesWithProperty } from "../../Types/PortTypeDefinitions";
import { createVector2 } from "../../Types/vectorDataType";
import { changeTypeGenerator, hasInputGenerator } from "../../Utils/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";

export const Divide: NodeDefinition = {
  id: "Divide",
  description: "Scale each component of two vector together",
  icon: IconMathXDivideY,
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
  availableTypes: portTypesWithProperty("divisionOperator"),
  onChangeType: changeTypeGenerator(["a", "b"], ["out"]),
  hasInput: hasInputGenerator(portTypesWithProperty("divisionOperator")),
  hasOutput: hasInputGenerator(portTypesWithProperty("divisionOperator")),
  getData: (portId, nodeData, context) => {
    var a = context.getInputValueVector(nodeData, "a");
    var b = context.getInputValueVector(nodeData, "b");
    const operator = PortTypeDefinitions[nodeData.selectedType].divisionOperator;
    if (operator) {
      return operator(a, b);
    } else {
      return PortTypeDefinitions[nodeData.selectedType].createDefaultValue();
    }
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["a", "b"], ({ a, b }) => `${a} / ${b}`);
  },
};
