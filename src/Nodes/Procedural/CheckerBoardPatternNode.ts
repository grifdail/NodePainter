import { IconGizmo } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createVector2 } from "../../Types/vectorDataType";
import { generateShaderCodeFromNodeData } from "../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { vectorAddition, vectorMultiplication } from "../../Utils/math/vectorUtils";

export const CheckerBoardPatternNode: NodeDefinition = {
  id: "Procedural/Checkerboard",
  hideInLibrary: false,
  icon: IconGizmo,
  description: "Generate a Checkerboard pattern",
  dataInputs: [
    { id: "uv", type: "vector2", defaultValue: createVector2(0, 0) },
    { id: "freq", type: "vector2", defaultValue: createVector2(2, 2) },
  ],

  dataOutputs: [{ id: "out", type: "number", defaultValue: 0 }],
  tags: ["Shader", "Vector"],

  codeBlockType: "expression",
  settings: [],
  shaderRequirement: `  float Checkerboard(vec2 UV, vec2 Frequency)
{
    UV = (UV + 0.5) * Frequency;
    vec2 Pos = floor(UV.xy);
    float PatternMask = mod(Pos.x + mod(Pos.y, 2.0), 2.0);
    return PatternMask;
}`,

  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["uv", "freq"], ({ uv, freq }) => `Checkerboard(${uv},  ${freq})`);
  },
  getData(portId, node, context) {
    const uv = context.getInputValueVector2(node, "uv");
    const freq = context.getInputValueVector2(node, "freq");
    var tuv = vectorMultiplication(vectorAddition(uv, [0.5, 0.5]), freq).map((a) => Math.floor(a));
    return (tuv[0] + (tuv[1] % 2)) % 2;
  },
};
