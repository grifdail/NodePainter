import { IconAssembly } from "@tabler/icons-react";
import { NodeDefinition } from "../Types/NodeDefinition";
export const START_NODE = "Start";
export const SKETCH_DEFAULT_NAME = "sketch";
export const SKETCH_DEFAULT_AUTHOR = "unknown";

export const SCALING_OPTIONS = {
    "absolute": (width: number, height: number) => [1, 1] as const,
    "relative": (width: number, height: number) => [width, height] as const,
    "width-relative": (width: number, height: number) => [width, width] as const,
    "height-relative": (width: number, height: number) => [height, height] as const
}

console.log(Object.keys(SCALING_OPTIONS))

export const StartNode: NodeDefinition = {
    id: START_NODE,
    description: "The start of the program",
    icon: IconAssembly,
    tags: ["Misc"],
    dataInputs: [
        {
            id: "drawing",
            type: "drawing2d",
            defaultValue: null,
        },
    ],
    hideInLibrary: true,
    dataOutputs: [],
    preventSnippet: true,
    settings: [
        { id: "name", type: "string", defaultValue: SKETCH_DEFAULT_NAME },
        { id: "width", type: "number", defaultValue: 400 },
        { id: "height", type: "number", defaultValue: 400 },
        { id: "scalling", tooltip: "Scale the canvas so that position and dimension are relative to the size of the canvas.", type: "dropdown", defaultValue: "absolute", options: Object.keys(SCALING_OPTIONS) }
    ],
    IsUnique: true,
};

console.log(StartNode)