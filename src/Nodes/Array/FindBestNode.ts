import { IconList, IconPlus, IconSearch } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
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
            ],
            "Filter index",
            positionX - 400,
            positionY,
            id
        );
    }, 10);
};

export const FindBestNode: NodeDefinition = {
    id: "Array/FindBest",
    description: "Return the index of the last with the highest `score`",
    icon: DoubleIconGen(IconList, IconSearch),
    tags: ["Array"],
    dataInputs: [
        {
            id: "array",
            type: "array-number",
            defaultValue: [],
        },
        {
            id: "score",
            type: "number",
            defaultValue: 0,
        },
    ],
    dataOutputs: [Port.number("index")],

    settings: [
        {
            type: "bool",
            id: "descending",
            defaultValue: false,
        },
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
    ...changeTypeGenerator(portTypesWithTags(["common"], ["array"]), [], [], ["array"], []),
    getData: (portId, node, context) => {
        const array = context.getInputValue(node, "array", node.dataInputs["array"].type) as any[];
        if (array.length === 0) {
            return -1;
        }
        var descending = node.settings.descending
        var bestElement = -1;
        var bestScore = descending ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY
        for (let i = 0; i < array.length; i++) {
            context.blackboard[`${node.id}-index`] = i;
            context.blackboard[`${node.id}-value`] = array[i];
            var result = context.getInputValueNumber(node, "score");
            if (descending) {
                if (result <= bestScore) {
                    bestElement = i;
                    bestScore = result
                }
            } else {
                if (result >= bestScore) {
                    bestElement = i;
                    bestScore = result
                }
            }

        }

        return bestElement;
    },
};
