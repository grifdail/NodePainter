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

    settings: [
        { id: "mode", type: "dropdown", defaultValue: "absolute", options: ["absolute", "relative"] }
    ],
    getData: (portId, node, context) => {
        const mod = (context.getSetting(node, "mode") || "absolute") as "absolute" | "relative";
        if (mod === "relative") {
            return createVector2(context.p5.mouseX / context.p5.width, context.p5.mouseY / context.p5.width);
        }

        return createVector2(context.p5.mouseX, context.p5.mouseY);
    },
};
