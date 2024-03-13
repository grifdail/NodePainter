import { IconGizmo } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { genShader } from "../../Data/genShader";
import { createVector2 } from "../../Data/vectorDataType";
import { VectorAddition, VectorMultiplication } from "../../Data/vectorUtils";

export const CheckerBoardPattern: NodeDefinition = {
  id: "Checkerboard",
  hideInLibrary: false,
  icon: IconGizmo,
  description: "Generate a Checkerboard pattern",
  dataInputs: [
    { id: "uv", type: "vector2", defaultValue: createVector2(0, 0) },
    { id: "freq", type: "vector2", defaultValue: createVector2(2, 2) },
  ],

  dataOutputs: [{ id: "out", type: "number", defaultValue: 0 }],
  tags: ["UV"],
  executeOutputs: [],
  settings: [],
  shaderRequirement: `  float Checkerboard(vec2 UV, vec2 Frequency)
{
    UV = (UV + 0.5) * Frequency;
    vec2 Pos = floor(UV.xy);
    float PatternMask = mod(Pos.x + mod(Pos.y, 2.0), 2.0);
    return PatternMask;
}`,

  getShaderCode(node, context) {
    return genShader(node, context, "out", ["uv", "freq"], ({ uv, freq }) => `Checkerboard(${uv},  ${freq})`);
  },
  getData(portId, node, context) {
    const uv = context.getInputValueVector2(node, "uv");
    const freq = context.getInputValueVector2(node, "freq");
    var tuv = VectorMultiplication(VectorAddition(uv, [0.5, 0.5]), freq).map((a) => Math.floor(a));
    return (tuv[0] + (tuv[1] % 2)) % 2;
  },
};
