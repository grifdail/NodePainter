import { IconFileText } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const LengthNode: NodeDefinition = {
    id: "Text/Length",
    label: "Text Lenght",
    description: "Return the lenght of the text",
    icon: IconFileText,
    tags: ["Text"],
    dataInputs: [{ id: "text", type: "string", defaultValue: "hello" }],
    dataOutputs: [{ id: "length", type: "number", defaultValue: 0 }],

    codeBlockType: "expression",
    settings: [],
    getData: (portId, node, context) => {
        const text = context.getInputValueString(node, "text");
        return text.length;
    },
};
