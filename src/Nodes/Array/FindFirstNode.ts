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

export const FindFirstNode: NodeDefinition = {
    id: "Array/FindFirst",
    description: "Return the index of the first element for which 'evaluate' was true or -1 if none was found",
    icon: DoubleIconGen(IconList, IconSearch),
    tags: ["Array"],
    dataInputs: [
        {
            id: "array",
            type: "array-number",
            defaultValue: [],
        },
        {
            id: "evaluate",
            type: "bool",
            defaultValue: false,
        },
    ],
    dataOutputs: [Port.number("index")],

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
    ...changeTypeGenerator(portTypesWithTags(["common"], ["array"]), [], [], ["array"], []),
    getData: (portId, node, context) => {
        const array = context.getInputValue(node, "array", node.dataInputs["array"].type) as any[];
        if (array.length === 0) {
            return -1;
        }
        for (let i = 0; i < array.length; i++) {
            context.blackboard[`${node.id}-index`] = i;
            context.blackboard[`${node.id}-value`] = array[i];
            var result = context.getInputValueBoolean(node, "evaluate");
            if (result) {
                return i;
            }

        }

        return -1;
    },
};
