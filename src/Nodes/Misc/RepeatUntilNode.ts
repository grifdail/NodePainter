import { IconArrowIteration, IconPlus } from "@tabler/icons-react";
import { SettingGenerator } from "../../Components/Settings/SettingGenerator";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";

const createIndexNode = ({ id, positionX, positionY, selectedType }: NodeData): void => {
    setTimeout(() => {
        useTree.getState().createBlackboardNode(
            [
                {
                    key: `${id}-index`,
                    type: "number",
                    id: "index",
                },
                {
                    key: `${id}-value`,
                    type: selectedType,
                    id: "value",
                },
                {
                    key: `${id}-count`,
                    type: "number",
                    id: "count",
                },
            ],
            "Compose loop index",
            positionX - 400,
            positionY,
            id
        );
    }, 10);
};

const changeType = changeTypeGenerator(portTypesWithTags(["common"]), ["value", "startingValue"], ["output"]);

export const RepeatUntilNode: NodeDefinition = {
    id: "Misc/RepeatUntil",
    label: "Repeat Until",
    icon: IconArrowIteration,
    alias: "for loop recursive",
    description: "Repeat some block of code a number of time, while receiving the result of the previous itteration",
    dataInputs: [
        { id: "condition", type: "bool", defaultValue: false },
        { id: "value", type: "number", defaultValue: 0 },
        { id: "startingValue", type: "number", defaultValue: 0 },
    ],
    dataOutputs: [
        {
            id: "output",
            type: "number",
            defaultValue: 0,
        },
    ],
    tags: ["Misc"],
    settings: [

        SettingGenerator.number("maxIteration", 1000000, { tooltip: "Prevent infinite loop" }),
        {
            id: "buttons",
            type: "button",
            button: {
                label: "Create index node",
                icon: IconPlus,
                onClick: createIndexNode,
            },
        },
    ],
    ...changeType,
    getData(portId, node, context) {
        const hasPort = node.dataInputs.condition.hasConnection
        if (!hasPort) {
            throw new Error("Repeat until port 'condition' need to be connected to a node.")
        }
        const maxIteration = node.settings.maxIteration;


        let lastValue = context.getInputValue<any>(node, "startingValue", node.selectedType)
        for (let i = 0; i < maxIteration; i++) {
            context.blackboard[`${node.id}-index`] = i;
            context.blackboard[`${node.id}-value`] = lastValue;

            lastValue = context.getInputValue<any>(node, "value", node.selectedType)
            const condition = context.getInputValueBoolean(node, "condition")
            if (condition) {
                return lastValue;
            }
        }
        return lastValue;

    },
    contextMenu: {
        "Create the index node": createIndexNode,
    },
};
