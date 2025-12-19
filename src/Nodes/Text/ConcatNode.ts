import { IconFileText } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const ConcatNode: NodeDefinition = {
    id: "Text/Concat",
    label: "Text Concatenation",
    description: "concat two string together",
    alias: "Join",
    icon: IconFileText,
    tags: ["Text"],
    dataInputs: [
        { id: "start", type: "string", defaultValue: "hello" },
        { id: "end", type: "string", defaultValue: "world" },
    ],
    dataOutputs: [{ id: "result", type: "string", defaultValue: "" }],

    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        return context.getInputValueString(node, "start") + context.getInputValueString(node, "end");
    },
};
