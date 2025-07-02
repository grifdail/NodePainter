import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";

export const ExponantialImpulse: NodeDefinition = {
  id: "Math/ExponantialImpulse",
  description: "Round up a number to the smallest interger larger or equal to itself.",
  icon: IconMathFunction,
  tags: ["Math", "Vector"],
  dataInputs: [Port.number("input"), Port.number("scale", 8, "Scale the impulse. Higher means denser. 8 approximately map 1 to 1")],
  dataOutputs: [
    {
      id: "out",
      type: "number",
      defaultValue: 0,
    },
  ],

  codeBlockType: "expression",
  settings: [],
  getData: (portId, nodeData, context) => {
    const x = context.getInputValueNumber(nodeData, "input");
    const k = context.getInputValueNumber(nodeData, "scale");
    const h = k * x;
    return h * Math.exp(1.0 - h);
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["input", "scale"], ({ input, scale }) => `(${input} * ${scale}) *  exp(1.0 - (${input} * ${scale}))`);
  },
};
