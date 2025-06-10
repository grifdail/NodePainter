import { IconGizmo } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createVector2 } from "../../Types/vectorDataType";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";

export const Twirl: NodeDefinition = {
  id: "Twirl",
  hideInLibrary: false,
  icon: IconGizmo,
  description: "Apply a twirl effect to an position",
  dataInputs: [
    { id: "uv", type: "vector2", defaultValue: createVector2(0, 0) },
    { id: "center", type: "vector2", defaultValue: createVector2(0.5, 0.5) },
    { id: "strength", type: "number", defaultValue: 1 },
    { id: "offset", type: "vector2", defaultValue: createVector2(0, 0) },
  ],

  dataOutputs: [{ id: "out", type: "vector2", defaultValue: createVector2(0, 0) }],
  tags: ["Vector"],

  settings: [],
  shaderRequirement: `vec2 Twirl(vec2 UV, vec2 Center, float Strength, vec2 Offset )
{
    vec2 delta = UV - Center;
    float angle = Strength * length(delta);
    float x = cos(angle) * delta.x - sin(angle) * delta.y;
    float y = sin(angle) * delta.x + cos(angle) * delta.y;
    return vec2(x + Center.x + Offset.x, y + Center.y + Offset.y);
}`,
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["uv", "center", "strength", "offset"], ({ uv, center, strength, offset }) => `Twirl(${uv}, ${center}, ${strength}, ${offset})`);
  },
};
