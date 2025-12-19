import { IconMovie } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const FrameNode: NodeDefinition = {
    id: "Input/Frame",
    description: "The current frame index relative to the execution of the preview",
    icon: IconMovie,
    tags: ["Input"],
    dataInputs: [],
    dataOutputs: [{ id: "frame", type: "number", defaultValue: 0 }],

    settings: [],
    getData: (portId, node, context) => {
        return context.p5.frameCount;
    },
};
