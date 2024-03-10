import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { createVector2 } from "../../Data/vectorDataType";
import { changeTypeGenerator } from "../../Data/changeTypeGenerator";
import { VectorTypeslimited } from "../../Data/vectorUtils";

export const DecomposeNode: NodeDefinition = {
  id: "Decompose",
  description: "split a vector or a number into its individual components",
  icon: IconArrowUpRightCircle,
  tags: ["Vector"],
  dataInputs: [
    {
      id: "vec",
      type: "vector2",
      defaultValue: createVector2(),
    },
  ],
  dataOutputs: [
    {
      id: "x",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "y",
      type: "number",
      defaultValue: 0,
    },
  ],
  executeOutputs: [],
  settings: [],
  defaultType: "vector2",
  availableTypes: [...VectorTypeslimited, "color"],
  onChangeType: changeTypeGenerator(["vec"], []),
  getData: (portId, nodeData, context) => {
    var vec = context.getInputValueVector(nodeData, "vec");
    if (portId === "x") {
      return vec[0];
    }
    if (portId === "y") {
      return vec[1];
    }
  },
  getShaderCode(node, context) {
    return `
    float ${context.getShaderVar(node, "x", true)} = ${context.getShaderVar(node, "vec")}.x;
    float ${context.getShaderVar(node, "y", true)} = ${context.getShaderVar(node, "vec")}.y;`;
  },
};
