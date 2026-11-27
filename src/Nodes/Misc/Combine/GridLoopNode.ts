import { IconArrowMerge, IconGridDots, IconPlus } from "@tabler/icons-react";
import { Object3D } from "three";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { useTree } from "../../../Hooks/useTree";
import { NodeData } from "../../../Types/NodeData";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { createVector2 } from "../../../Types/vectorDataType";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { update3DGroupChildren } from "./LoopNode";

const createIndexNode = ({ id, positionX, positionY }: NodeData): void => {
    setTimeout(() => {
        useTree.getState().createBlackboardNode(
            [
                {
                    key: `${id}-pos`,
                    type: "vector2",
                    id: "pos",
                },
                {
                    key: `${id}-index`,
                    type: "number",
                    id: "index",
                },
                {
                    key: `${id}-count`,
                    type: "vector2",
                    id: "size",
                },
            ],
            "Generate Combine loop index",
            positionX - 400,
            positionY,
            id
        );
    }, 10);
};

export const GridLoopNode: NodeDefinition = {
    id: "Misc/Combine/GridLoop",
    label: "Combine Grid Loop",
    icon: DoubleIconGen(IconArrowMerge, IconGridDots),
    alias: "for",
    description: "Compose an object from multiple object while looping over a grid",

    dataInputs: [Port.vector2("size", [10, 10]), Port.drawing2d("value")],
    dataOutputs: [Port.drawing2d("output")],
    tags: ["3D"],
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
    ...changeTypeGenerator(["drawing2d", "object3d"], ["value"], ["output"]),
    getData(portId, node, context) {
        const size = context.getInputValueVector2(node, "size");

        context.blackboard[`${node.id}-count`] = size;

        if (node.selectedType === "drawing2d") {
            const array: any[] = [];
            context.pushIterationLevel()
            for (let y = 0; y < size[1]; y++) {
                for (let x = 0; x < size[0]; x++) {
                    context.blackboard[`${node.id}-index`] = y * size[1] + x;
                    context.blackboard[`${node.id}-pos`] = createVector2(x, y);
                    context.setIterationIndex(y * size[1] + x);
                    array[x * size[0] + y] = context.getInputValue(node, "value", node.selectedType);
                }
            }
            context.popIterationLevel();
            return () => {
                array.forEach((item) => item());
            };
        } else {
            const newChildren: Record<string, Object3D> = {};
            context.pushIterationLevel()
            for (let y = 0; y < size[1]; y++) {
                for (let x = 0; x < size[0]; x++) {
                    context.blackboard[`${node.id}-index`] = y * size[1] + x;
                    context.blackboard[`${node.id}-pos`] = createVector2(x, y);
                    context.setIterationIndex(y * size[1] + x);
                    const t = context.getInputValue(node, "value", "object3d") as Object3D;
                    if (t) {
                        newChildren[t.id] = t;
                    }
                }
            }

            context.popIterationLevel();
            return update3DGroupChildren(context, node, newChildren)
        }
    },

};
