import { IconList, IconPlus } from "@tabler/icons-react";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortType } from "../../Types/PortType";
import { PortTypeDefinitions, portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { convertTypeValue } from "../../Utils/graph/execution/convertTypeValue";

const addNewPort = (node: NodeData) => {
    var count = Object.entries(node.dataOutputs).length;
    node.dataOutputs[`value-${count}`] = {
        id: `value-${count}`,
        type: node.selectedType,
        defaultValue: PortTypeDefinitions[node.selectedType].createDefaultValue(),
    };
};

export const ReadNode: NodeDefinition = {
    id: "Array/Read",
    description: "Easily Access multiple value of an array",
    icon: IconList,
    tags: ["Array"],
    dataInputs: [
        {
            id: "array",
            type: "array-number",
            defaultValue: 0,
        },
    ],
    dataOutputs: [
        { id: "value-0", defaultValue: 0, type: "number" },
        { id: "value-1", defaultValue: 0, type: "number" },
    ],

    settings: [
        {
            id: "buttons",
            type: "button",
            button: {
                label: "Add a new Port",
                icon: IconPlus,
                onClick: addNewPort,
            },
        },
    ],
    availableTypes: portTypesWithTags(["common"], ["array"]),
    onChangeType(node, type) {
        const nType = `array-${type}` as PortType;
        node.dataInputs["array"].ownValue = convertTypeValue(node.dataInputs["array"].ownValue, node.dataInputs["array"].type, nType);
        node.dataInputs["array"].type = nType;
        Object.keys(node.dataOutputs).forEach((key) => {
            node.dataOutputs[key].type = type;
        });
    },
    getData: (portId, node, context) => {
        var id = parseInt(portId.replace("value-", ""));
        if (!Number.isNaN(id)) {
            const nType = `array-${node.selectedType}` as PortType;
            const v = context.getInputValue<any[]>(node, "array", nType);
            if (v.length) {
                return v[id % v.length];
            }
        }
        return PortTypeDefinitions[node.selectedType].createDefaultValue();
    },
    hasOutput(output, def) {

        return def.availableTypes?.includes(output) ? output : null;
    },
    hasInput(input, def) {
        return def.availableTypes?.includes(input) ? input : null;
    },
    contextMenu: {
        "Add a port": addNewPort,
        "Remove last port": (node) => {
            var entries = Object.entries(node.dataOutputs);
            if (entries.length > 1) {
                var [key] = entries[entries.length - 1];
                delete node.dataOutputs[key];
            }
        },
    },
};
