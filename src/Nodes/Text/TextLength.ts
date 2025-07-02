import { IconFileText } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const TextLength: NodeDefinition = {
  id: "TextLength",
  description: "Return the lenght of the text",
  icon: IconFileText,
  tags: ["Text"],
  dataInputs: [{ id: "text", type: "string", defaultValue: "hello" }],
  dataOutputs: [{ id: "length", type: "number", defaultValue: 0 }],

  codeBlockType: "expression",
  settings: [],
  getData: (portId, nodeData, context) => {
    const text = context.getInputValueString(nodeData, "text");
    return text.length;
  },
};
