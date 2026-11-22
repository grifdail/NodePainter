import { IconEqual } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../Utils/graph/execution/generateShaderCodeFromNodeData";

export const PrintNode: NodeDefinition = {
    id: "Misc/Print",
    description: "Log the value passing through in the console",
    icon: IconEqual,
    tags: ["Misc"],
    alias: "Log console",
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
            tooltip: "",
        },
    ],
    ...changeTypeGenerator(portTypesWithTags(["common"]), ["value"], ["out"]),
    getData: (portId, node, context) => {
        const v = context.getInputValue(node, "value", node.selectedType)
        console.log(`${node.settings.name} : `, v);
        return v;
    },
    getShaderCode(node, context) {
        return generateShaderCodeFromNodeData(node, context, "out", ["value"], ({ value }) => `${value}`);
    },
};
