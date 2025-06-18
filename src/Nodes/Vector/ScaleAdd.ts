import { IconMathXPlusY } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { createVector2 } from "../../Types/vectorDataType";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";
import { enforceCorrectVectorTypeForNode } from "../../Utils/graph/execution/enforceCorrectVectorTypeForNode";
import { generateShaderCodeFromNodeData } from "../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { vectorAddition, vectorScale } from "../../Utils/math/vectorUtils";

export const ScaleAdd: NodeDefinition = {
  id: "ScaleAdd",
  description: "Multiply two value and add another",
  icon: IconMathXPlusY,
  featureLevel: 95,
  tags: ["Math", "Vector"],
  dataInputs: [
    {
      id: "value",
      type: "vector2",
      defaultValue: createVector2(),
    },
    {
      id: "scale",
      type: "number",
      defaultValue: 1,
    },
    {
      id: "added",
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

  settings: [],
  availableTypes: portTypesWithTags(["common", "vector"], ["array"]),
  onChangeType: changeTypeGenerator(["value", "added"], ["out"]),
  getData: (portId, nodeData, context) => {
    var value = context.getInputValueVector(nodeData, "value");
    var scale = context.getInputValueNumber(nodeData, "scale");
    var added = context.getInputValueVector(nodeData, "added");
    return enforceCorrectVectorTypeForNode(nodeData, vectorAddition(vectorScale(value, scale), added));
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["value", "scale", "added"], ({ value, scale, added }) => `${value} * ${scale} + ${added}`);
  },
};
