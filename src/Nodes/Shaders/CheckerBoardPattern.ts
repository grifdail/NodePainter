import { IconGizmo } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { genShader } from "../../Data/genShader";
import { createColor, createVector2 } from "../../Data/vectorDataType";

export const CheckerBoardPattern: NodeDefinition = {
  id: "Checkerboard",
  hideInLibrary: false,
  icon: IconGizmo,
  description: "Generate a Checkerboard pattern",
  dataInputs: [
    { id: "uv", type: "vector2", defaultValue: createVector2(0, 0) },
    { id: "freq", type: "vector2", defaultValue: createVector2(2, 2) },
    { id: "colorA", type: "color", defaultValue: createColor(0.25, 0.25, 0.25, 1) },
    { id: "colorB", type: "color", defaultValue: createColor(0.75, 0.75, 0.75, 1) },
  ],

  dataOutputs: [{ id: "out", type: "color", defaultValue: createColor() }],
  tags: ["UV"],
  executeOutputs: [],
  settings: [],
  shaderRequirement: `  vec4 Checkerboard(vec4 UV, vec4 ColorA, vec4 ColorB, vec4 Frequency)
{
    UV = (UV + 0.5) * Frequency;
    vec2 Pos = floor(UV.xy);
    float PatternMask = mod(Pos.x + mod(Pos.y, 2.0), 2.0);
    return mix(ColorA, ColorB, PatternMask);
}`,
  getShaderCode(node, context) {
    return genShader(node, context, "vec4", "out", ["uv", "freq", "colorA", "colorB"], ([uv, freq, a, b]) => `Checkerboard(${uv}, ${a}, ${b}, ${freq})`);
  },
};
