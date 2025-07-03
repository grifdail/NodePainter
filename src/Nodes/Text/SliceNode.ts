import { IconFileText } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const SliceNode: NodeDefinition = {
  id: "Text/Slice",
  label: "Text Slice",
  description: "Return a portion of text from start to end",
  icon: IconFileText,
  tags: ["Text"],
  dataInputs: [
    { id: "text", type: "string", defaultValue: "hello" },
    { id: "start", type: "number", defaultValue: 0 },
    { id: "end", type: "number", defaultValue: 1 },
  ],
  dataOutputs: [{ id: "result", type: "string", defaultValue: "" }],

  codeBlockType: "expression",
  settings: [],
  getData: (portId, nodeData, context) => {
    const text = context.getInputValueString(nodeData, "text");
    return text.slice(context.getInputValueNumber(nodeData, "start"), context.getInputValueNumber(nodeData, "end"));
  },
};
