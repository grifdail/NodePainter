import { IconMouse } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createVector2 } from "../../Types/vectorDataType";

export const MousePositionNode: NodeDefinition = {
    id: "Input/MousePosition",
    label: "Mouse Position",
    description: "The position of the cursor relative to the canvas",
    icon: IconMouse,
    tags: ["Input"],
    dataInputs: [],
    dataOutputs: [{ id: "pos", type: "vector2", defaultValue: createVector2() }],

    settings: [],
    getData: (portId, node, context) => {
        return createVector2(context.p5.mouseX, context.p5.mouseY);
    },
};
