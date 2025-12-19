import { IconEqual } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../Utils/graph/execution/generateShaderCodeFromNodeData";

export const ValueNode: NodeDefinition = {
    id: "Misc/Value",
    description: "Represente a single value",
    icon: IconEqual,
    tags: ["Misc"],
    alias: "Constant Redirect",
    dataInputs: [
        {
            id: "value",
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

    settings: [
        {
            type: "string",
            id: "name",
            defaultValue: "value",
            tooltip: "Doesn't have any logic, only used as commentary.",
        },
    ],
    ...changeTypeGenerator(portTypesWithTags(["common"]), ["value"], ["out"]),
    getData: (portId, node, context) => {
        return context.getInputValue(node, "value", node.selectedType);
    },
    getShaderCode(node, context) {
        return generateShaderCodeFromNodeData(node, context, "out", ["value"], ({ value }) => `${value}`);
    },
};
