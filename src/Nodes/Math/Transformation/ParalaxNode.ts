import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { createVector2 } from "../../../Types/vectorDataType";
import { vectorAddition, vectorScale } from "../../../Utils/math/vectorUtils";

export const ParallaxNode: NodeDefinition = {
    id: "Math/Transformation/Parallax",
    description: "Return the position of the element as if they were on multiple layer",
    icon: IconArrowUpRightCircle,
    tags: ["Vector", "Math"],
    dataInputs: [
        Port.vector2("position", createVector2()),
        Port.number("layer", 0, "Item on layer 0 don't move. Positive number are in the back, negative number are on the front."),
        Port.vector2("camera", createVector2(), "The position of the observer relative to layer 0"),
    ],
    dataOutputs: [
        { id: "out", type: "vector2", defaultValue: createVector2() },
    ],

    settings: [],
    getData: (portId, node, context) => {
        const position = context.getInputValueVector2(node, "position");
        const layer = context.getInputValueNumber(node, "layer");
        const camera = context.getInputValueVector2(node, "camera");
        return vectorAddition(position, vectorScale(camera, layer))
    },
};
