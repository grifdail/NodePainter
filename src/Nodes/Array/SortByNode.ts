import { IconList, IconPlus, IconReorder } from "@tabler/icons-react";
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

export const SortByNode: NodeDefinition = {
    id: "Array/SortBy",
    description: "Return the array sorted by the value returned by 'evaluate'",
    icon: DoubleIconGen(IconList, IconReorder),
    tags: ["Array"],
    dataInputs: [
        {
            id: "array",
            type: "array-number",
            defaultValue: [],
        },
        Port.number('evaluate')
    ],
    dataOutputs: [Port["array-number"]("sorted")],

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
    ...changeTypeGenerator(portTypesWithTags(["common"], ["array"]), [], [], ["array"], ["sorted"]),
    getData: (portId, node, context) => {
        const array = context.getInputValue(node, "array", node.dataInputs["array"].type) as any[];
        if (array.length === 0) {
            return [];
        }
        var descending = node.settings.descending;
        var sortingArray = []
        for (let i = 0; i < array.length; i++) {
            context.blackboard[`${node.id}-index`] = i;
            context.blackboard[`${node.id}-value`] = array[i];
            sortingArray[i] = [array[i], context.getInputValueNumber(node, "evaluate")];
        }
        sortingArray.sort((a, b) => descending ? b[1] - a[1] : a[1] - b[1])

        return sortingArray.map(a => a[0]);
    },
};
