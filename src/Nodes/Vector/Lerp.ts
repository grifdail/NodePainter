import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortTypeDefinitions, portTypesWithProperty } from "../../Types/PortTypeDefinitions";
import { createVector2 } from "../../Types/vectorDataType";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../Utils/graph/execution/generateShaderCodeFromNodeData";

export const Lerp: NodeDefinition = {
  id: "Lerp",
  description: "interpolate between 2 vector",
  icon: IconMathFunction,
  featureLevel: 50,
  tags: ["Math", "Vector"],
  dataInputs: [
    {
      id: "from",
      type: "vector2",
      defaultValue: createVector2(),
    },
    {
      id: "to",
      type: "vector2",
      defaultValue: createVector2(),
    },
    {
      id: "t",
      type: "number",
      defaultValue: 0.5,
    },
  ],
  dataOutputs: [
    {
      id: "result",
      type: "vector2",
      defaultValue: createVector2(),
    },
  ],

  settings: [],
  availableTypes: portTypesWithProperty("lerpOperator"),
  onChangeType: changeTypeGenerator(["from", "to"], ["result"]),
  getData: (portId, nodeData, context) => {
    const t = context.getInputValueNumber(nodeData, "t");
    const a = context.getInputValue(nodeData, "from", nodeData.selectedType);
    const b = context.getInputValue(nodeData, "to", nodeData.selectedType);
    const operator = PortTypeDefinitions[nodeData.selectedType].lerpOperator;
    return operator ? operator(a, b, t) : PortTypeDefinitions[nodeData.selectedType].createDefaultValue();
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "result", ["from", "to", "t"], ({ from, to, t }) => `mix(${from}, ${to}, ${t})`);
  },
};
