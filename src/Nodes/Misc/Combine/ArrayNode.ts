import { IconArrowMerge, IconList } from "@tabler/icons-react";
import { Object3D } from "three";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { update3DGroupChildren } from "./LoopNode";


export const ArrayNode: NodeDefinition = {
    id: "Misc/Combine/Array",
    label: "Combine Array",
    icon: DoubleIconGen(IconArrowMerge, IconList),
    description: "Compose an object from multiple object in an array",

    dataInputs: [{ id: "array", type: "array-drawing2d", defaultValue: null }],
    dataOutputs: [
        {
            id: "output",
            type: "drawing2d",
            defaultValue: null,
        },
    ],
    tags: ["3D"],
    settings: [],
    ...changeTypeGenerator(["drawing2d", "object3d"], [], ["output"], ["array"]),
    getData(portId, node, context) {

        if (node.selectedType === "drawing2d") {
            const array = context.getInputValue(node, "array", `array-drawing2d`) as (() => void | null)[];
            return () => {
                array.forEach((item) => {
                    if (item) {
                        item();
                    }
                });
            };
        } else {
            const array = context.getInputValue(node, "array", `array-object3d`) as Object3D[];
            const newChildren = Object.fromEntries(array.filter(a => a).map(a => [a.id, a]));
            return update3DGroupChildren(context, node, newChildren)
        }


    },
};
