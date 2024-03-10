import { IconGizmo } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { genShader } from "../../Data/genShader";
import { createVector2 } from "../../Data/vectorDataType";

export const GradientNoise: NodeDefinition = {
  id: "GradientNoise",
  hideInLibrary: false,
  icon: IconGizmo,
  description: "Generate a GradientNoise pattern",
  dataInputs: [
    { id: "uv", type: "vector2", defaultValue: createVector2(0, 0) },
    { id: "scale", type: "number", defaultValue: 1 },
  ],

  dataOutputs: [{ id: "out", type: "number", defaultValue: 0 }],
  tags: ["UV"],
  executeOutputs: [],
  settings: [],
  shaderRequirement: `vec2 gradientNoise_dir(vec2 p)
{
    p = mod(p, 289.0);
    float x = mod((34.0 * p.x + 1.0) * p.x, 289.0) + p.y;
    x = mod((34.0 * x + 1.0) * x, 289.0);
    x = fract(x / 41.0) * 2.0 - 1.0;
    return normalize(vec2(x - floor(x + 0.5), abs(x) - 0.5));
}

float gradientNoise(vec2 p)
{
    vec2 ip = floor(p);
    vec2 fp = fract(p);
    float d00 = dot(gradientNoise_dir(ip), fp);
    float d01 = dot(gradientNoise_dir(ip + vec2(0.0, 1.0)), fp - vec2(0.0, 1.0));
    float d10 = dot(gradientNoise_dir(ip + vec2(1.0, 0.0)), fp - vec2(1.0, 0.0));
    float d11 = dot(gradientNoise_dir(ip + vec2(1.0, 1.0)), fp - vec2(1.0, 1.0));
    fp = fp * fp * fp * (fp * (fp * 6.0 - 15.0) + 10.0);
    return mix(mix(d00, d01, fp.y), mix(d10, d11, fp.y), fp.x);
}

float GradientNoise_float(vec4 UV, float Scale)
{
    return gradientNoise(UV.xy * Scale) + 0.5;
}`,
  getShaderCode(node, context) {
    return genShader(node, context, "float", "out", ["uv", "scale"], ([uv, scale]) => `GradientNoise_float(${uv}, ${scale})`);
  },
};
