import { IconAssembly } from "@tabler/icons-react";
import { NodeDefinition } from "../Types/NodeDefinition";
export const START_NODE = "Start";
export const SKETCH_DEFAULT_NAME = "sketch";

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
  ],
  IsUnique: true,
};
