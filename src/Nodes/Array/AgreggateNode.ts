import { IconArrowRight, IconList, IconPlus } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { PortTypeDropdown } from "../../Components/Modals/CustomNodes/PortTypeDropdown";
import { useDialog } from "../../Hooks/useDialog";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortType } from "../../Types/PortType";
import { PortTypeDefinitions, portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { createPortConnection } from "../../Utils/graph/modification/createPortConnection";

const createIndexNode = ({ id, positionX, positionY, dataInputs }: NodeData): void => {
    var typeValue = dataInputs["in"].type.slice("array-".length) as PortType;
    var typeAccumulator = dataInputs["accumulator"].type as PortType;
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
                    type: typeValue,
                    id: "value",
                },
                {
                    key: `${id}-accumulator`,
                    type: typeAccumulator,
                    id: "accumulator",
                },
            ],
            "Array agregate index",
            positionX - 400,
            positionY,
            id
        );
    }, 10);
};

export const AgreggateNode: NodeDefinition = {
    id: "Array/Agreggate",
    alias: "Reduce",
    description: "Combine every element of the array into a single value",
    icon: DoubleIconGen(IconList, IconArrowRight),
    tags: ["Array"],
    dataInputs: [],
    dataOutputs: [],
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
    onManualCreation(node) {
        useDialog.getState().open({
            callback: function (button: any, fieldResult: { [key: string]: any } | undefined): void {
                if (button === "cancel" || fieldResult === undefined) {
                    useTree.getState().deleteNode(node.id);
                    return;
                }
                var input = fieldResult["input"] as PortType;
                var output = fieldResult["output"] as PortType;
                useTree.getState().dangerouselyUpdateNode(node.id, (node) => {
                    node.dataInputs["in"] = createPortConnection({
                        id: "in",
                        type: input,
                        defaultValue: [],
                    });
                    node.dataInputs["accumulator"] = createPortConnection({
                        id: "accumulator",
                        type: output,
                        defaultValue: PortTypeDefinitions[output]?.createDefaultValue(),
                    });
                    node.dataOutputs["out"] = { id: "out", defaultValue: [], type: output };
                });
            },
            buttons: [
                {
                    key: "confirm",
                    label: "Confirm",
                    style: "normal",
                },
                {
                    key: "cancel",
                    label: "cancel",
                    style: "invisible",
                },
            ],
            fields: [
                {
                    key: "input",
                    label: "Input",
                    input: PortTypeDropdown,
                    defaultValue: "array-number",
                    passTrough: { availableTypes: portTypesWithTags(["common", "array"]) },
                },
                {
                    key: "output",
                    label: "Accumulator type",
                    input: PortTypeDropdown,
                    defaultValue: "number",
                    passTrough: { availableTypes: portTypesWithTags(["common"]) },
                },
            ],
        });
    },
    getData: (portId, node, context) => {
        const array = context.getInputValue(node, "in", node.dataInputs["in"].type) as any[];
        if (array.length === 0) {
            return PortTypeDefinitions[node.dataOutputs["out"].type].createDefaultValue();
        }
        const result: any[] = array.reduce((accumulator, item, i) => {
            context.blackboard[`${node.id}-index`] = i;
            context.blackboard[`${node.id}-value`] = item;
            context.blackboard[`${node.id}-accumulator`] = accumulator;
            return context.getInputValue(node, "accumulator", node.dataInputs["accumulator"].type);
        });
        return result;
    },
};
