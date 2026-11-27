import { IconArrowMerge, IconPlus, IconRepeat } from "@tabler/icons-react";
import { Group, Object3D, Object3DEventMap } from "three";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { useTree } from "../../../Hooks/useTree";
import { NodeData } from "../../../Types/NodeData";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { readFromCacheWithVersion } from "../../../Utils/graph/execution/blackboardCache";
import { ExecutionContext } from "../../../Utils/graph/execution/createExecutionContext";

const createIndexNode = ({ id, positionX, positionY }: NodeData): void => {
    setTimeout(() => {
        useTree.getState().createBlackboardNode(
            [
                {
                    key: `${id}-index`,
                    type: "number",
                    id: "index",
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

export const LoopNode: NodeDefinition = {
    id: "Misc/Combine/Loop",
    label: "Combine Loop",
    icon: DoubleIconGen(IconArrowMerge, IconRepeat),
    alias: "for",
    description: "Compose an object from multiple object on a loop",
    featureLevel: 101,
    dataInputs: [
        { id: "count", type: "number", defaultValue: 10 },
        { id: "value", type: "drawing2d", defaultValue: null },
    ],
    dataOutputs: [
        {
            id: "output",
            type: "drawing2d",
            defaultValue: null,
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
    ...changeTypeGenerator(["drawing2d", "object3d"], ["value"], ["output"]),
    getData(portId, node, context) {
        const count = context.getInputValueNumber(node, "count");
        context.blackboard[`${node.id}-count`] = count;
        if (node.selectedType === "drawing2d") {
            const array: (() => void)[] = [];
            context.pushIterationLevel()
            for (let i = 0; i < count; i++) {
                context.blackboard[`${node.id}-index`] = i;
                context.setIterationIndex(i);
                array[i] = context.getInputValueDrawing(node, "value");
            }
            context.popIterationLevel();
            return () => {
                array.forEach((item) => item());
            };
        } else {
            const newChildren: Record<string, Object3D> = {};
            context.pushIterationLevel()
            for (let i = 0; i < count; i++) {
                context.blackboard[`${node.id}-index`] = i;
                context.blackboard[`${node.id}-count`] = count;
                context.setIterationIndex(i);
                const t = context.getInputValue(node, "value", "object3d") as Object3D;
                if (t) {
                    newChildren[t.id] = t;
                }
            }
            context.popIterationLevel();
            return update3DGroupChildren(context, node, newChildren);
        }
    }
};
export function update3DGroupChildren(context: ExecutionContext, node: NodeData, newChildren: Record<string, Object3D<Object3DEventMap>>) {
    const model = readFromCacheWithVersion(context, node, () => {
        return new Group();
    }, undefined, undefined, true);
    const oldChildren = Object.fromEntries(model.children.map(a => [a.id, a]));
    for (let key in newChildren) {
        if (!oldChildren[key]) {
            model.add(newChildren[key]);
        }
    }
    for (let key in oldChildren) {
        if (!newChildren[key]) {
            model.remove(oldChildren[key]);
        }
    }
    return model;
}

