import { IconNumber1 } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { generateShaderCodeFromNodeData } from "../../Utils/graph/execution/generateShaderCodeFromNodeData";

export const OneMinus: NodeDefinition = {
  id: "OneMinus",
  description: "Return 1 minus the value",
  icon: IconNumber1,
  tags: ["Math"],
  dataInputs: [
    {
      id: "input",
      type: "number",
      defaultValue: 0,
    },
  ],
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
    var a = context.getInputValueNumber(nodeData, "input");
    return 1 - a;
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["input"], ({ input }) => `1.0-${input}`);
  },
};
