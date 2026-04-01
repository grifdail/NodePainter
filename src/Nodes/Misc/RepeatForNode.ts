import { IconArrowIteration, IconPlus } from "@tabler/icons-react";
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

export const RepeatForNode: NodeDefinition = {
    id: "Misc/RepeatFor",
    label: "Repeat",
    icon: IconArrowIteration,
    alias: "for loop recursive",
    description: "Repeat some block of code a number of time, until 'condition' become true",
    hideInJs: true,
    dataInputs: [
        { id: "count", type: "number", defaultValue: 10 },
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
        const count = context.getInputValueNumber(node, "count");
        context.blackboard[`${node.id}-count`] = count;

        let lastValue = context.getInputValue<any>(node, "startingValue", node.selectedType)
        for (let i = 0; i < count; i++) {
            context.blackboard[`${node.id}-index`] = i;
            context.blackboard[`${node.id}-value`] = lastValue;

            lastValue = context.getInputValue<any>(node, "value", node.selectedType)
        }
        return lastValue;

    },
    contextMenu: {
        "Create the index node": createIndexNode,
    },
};
