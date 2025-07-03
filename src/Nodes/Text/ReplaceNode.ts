import { IconFileText } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";

export const ReplaceNode: NodeDefinition = {
  id: "Text/Replace",
  label: "Text Replace",
  description: "Replace every instance of the first target text in the source text by another",
  icon: IconFileText,
  tags: ["Text"],
  dataInputs: [
    //
    Port.string("source", "Hello World"),
    Port.string("target", "World"),
    Port.string("replacement", "Planet"),
  ],
  dataOutputs: [{ id: "result", type: "string", defaultValue: [] }],
  codeBlockType: "expression",
  settings: [{ id: "isRegex", type: "bool", label: "Is Regex", defaultValue: false }],
  getData: (portId, node, context) => {
    const source = context.getInputValueString(node, "source");
    const target = context.getInputValueString(node, "target");
    const replacement = context.getInputValueString(node, "replacement");
    const isRegex = node.settings.isRegex;
    try {
      return source.replaceAll(isRegex ? new RegExp(target, "g") : target, replacement);
    } catch {
      return source;
    }
  },
};
