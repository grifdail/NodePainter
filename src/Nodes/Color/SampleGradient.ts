import { IconColorFilter } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { VectorLerp } from "../../Utils/vectorUtils";
import { createColor, createDefaultGradient } from "../../Types/vectorDataType";
import { clamp01, map } from "../../Utils/colorUtils";

export const SampleGradient: NodeDefinition = {
  id: "SampleGradient",
  label: "Sample Gradient",
  description: "Sample a gradient",
  icon: IconColorFilter,
  tags: ["Color"],
  dataInputs: [
    { id: "gradient", type: "gradient", defaultValue: createDefaultGradient() },
    { id: "pos", type: "number", defaultValue: 0.5 },
  ],
  dataOutputs: [{ id: "color", type: "color", defaultValue: createColor() }],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    const gradient = context.getInputValueGradient(nodeData, "gradient") || createDefaultGradient();
    const pos = context.getInputValueNumber(nodeData, "pos");
    if (gradient.length === 0) {
      return createColor();
    }
    let prev = gradient[0];
    if (pos <= prev.pos) {
      return prev.color;
    }
    for (var stop of gradient) {
      if (pos < stop.pos) {
        return VectorLerp(prev.color, stop.color, clamp01(map(prev.pos, stop.pos, pos)));
      } else {
        prev = stop;
      }
    }
    return prev.color;
  },
};
