import { IconFileText } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";

export const JoinNode: NodeDefinition = {
  id: "Text/Join",
  label: "Text Join",
  description: "Join an array of string using the given separator",
  icon: IconFileText,
  tags: ["Text"],
  dataInputs: [Port["array-string"]("list"), Port.string("separator", " - ")],
  dataOutputs: [Port.string("out")],
  codeBlockType: "expression",
  settings: [],
  getData: (portId, node, context) => {
    const source = context.getInputValue(node, "list", "array-string") as string[];
    const separator = context.getInputValueString(node, "separator");
    return source.join(separator);
  },
};
