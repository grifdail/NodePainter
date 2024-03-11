import { IconGizmo } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { genShader } from "../../Data/genShader";
import { createVector2 } from "../../Data/vectorDataType";

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
  tags: ["UV"],
  executeOutputs: [],
  settings: [],
  shaderRequirement: `vec4 Twirl(vec4 UV, vec4 Center, float Strength, vec4 Offset )
{
    vec4 delta = UV - Center;
    float angle = Strength * length(delta);
    float x = cos(angle) * delta.x - sin(angle) * delta.y;
    float y = sin(angle) * delta.x + cos(angle) * delta.y;
    return vec4(x + Center.x + Offset.x, y + Center.y + Offset.y, 0.0, 0.0);
}`,
  getShaderCode(node, context) {
    return genShader(node, context, "out", ["uv", "center", "strength", "offset"], ({ uv, center, strength, offset }) => `Twirl(${uv}, ${center}, ${strength}, ${offset})`);
  },
};
