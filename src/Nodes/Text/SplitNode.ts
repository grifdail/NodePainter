import { IconFileText } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";

export const SplitNode: NodeDefinition = {
  id: "Text/Split",
  label: "Text Split",
  description: "Split the text on every instance of the regex",
  icon: IconFileText,
  tags: ["Text"],
  dataInputs: [Port.string("source", "Hello World"), Port.string("target", "\\s")],
  dataOutputs: [{ id: "result", type: "array-string", defaultValue: [] }],
  codeBlockType: "expression",
  settings: [{ id: "isRegex", type: "bool", label: "Is Regex", defaultValue: true }],
  getData: (portId, node, context) => {
    const source = context.getInputValueString(node, "source");
    const target = context.getInputValueString(node, "target");
    const isRegex = node.settings.isRegex;
    try {
      return source.split(isRegex ? new RegExp(target, "g") : target);
    } catch {
      return [source];
    }
  },
};
