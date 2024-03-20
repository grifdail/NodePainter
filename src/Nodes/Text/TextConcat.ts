import { IconFileText } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const TextConcat: NodeDefinition = {
  id: "TextConcat",
  description: "concat two string together",
  icon: IconFileText,
  tags: ["Text"],
  dataInputs: [
    { id: "start", type: "string", defaultValue: "hello" },
    { id: "end", type: "string", defaultValue: "world" },
  ],
  dataOutputs: [{ id: "result", type: "string", defaultValue: "" }],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    return context.getInputValueString(nodeData, "start") + context.getInputValueString(nodeData, "end");
  },
};
