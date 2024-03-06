import { IconGizmo } from "@tabler/icons-react";
import { NodeDefinition } from "../Data/NodeDefinition";
import { genShader } from "./genShader";
import { createVector } from "./Vector";
import { createColor } from "./Color";

export const UVNodes: Array<NodeDefinition> = [
  {
    id: "Twirl",
    hideInLibrary: false,
    icon: IconGizmo,
    description: "Apply a twirl effect to an position",
    dataInputs: [
      { id: "uv", type: "vector2", defaultValue: createVector(0, 0) },
      { id: "center", type: "vector2", defaultValue: createVector(0.5, 0.5) },
      { id: "strength", type: "number", defaultValue: 1 },
      { id: "offset", type: "vector2", defaultValue: createVector(0, 0) },
    ],

    dataOutputs: [{ id: "out", type: "vector2", defaultValue: createVector(0, 0) }],
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
      return genShader(node, context, "vec4", "out", ["uv", "center", "strength", "offset"], ([uv, center, strength, offset]) => `Twirl(${uv}, ${center}, ${strength}, ${offset})`);
    },
  },
  {
    id: "GradientNoise",
    hideInLibrary: false,
    icon: IconGizmo,
    description: "Generate a GradientNoise pattern",
    dataInputs: [
      { id: "uv", type: "vector2", defaultValue: createVector(0, 0) },
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
  },
  {
    id: "WorleyNoise",
    hideInLibrary: false,
    icon: IconGizmo,
    description: "Generate a Voronoi pattern",
    dataInputs: [
      { id: "uv", type: "vector2", defaultValue: createVector(0, 0) },
      { id: "angleOffset", type: "number", defaultValue: 5 },
      { id: "cellDensity", type: "number", defaultValue: 10 },
    ],

    dataOutputs: [
      { id: "out", type: "number", defaultValue: 0 },
      { id: "cell", type: "number", defaultValue: 0 },
      { id: "dir", type: "vector2", defaultValue: createVector() },
    ],
    tags: ["UV"],
    executeOutputs: [],
    settings: [],
    shaderRequirement: `vec2 unity_voronoi_noise_randomVector (vec2 UV, float offset)
{
    mat2 m = mat2(15.27, 47.63, 99.41, 89.98);
    UV = fract(sin(UV*m) * 46839.32);
    return vec2(sin(UV.y*+offset)*0.5+0.5, cos(UV.x*offset)*0.5+0.5);
}

void Voronoi(vec2 UV, float AngleOffset, float CellDensity, out float Out, out float Cells, out vec4 dir)
{
    vec2 g = floor(UV * CellDensity);
    vec2 f = fract(UV * CellDensity);
    float t = 8.0;
    vec3 res = vec3(8.0, 0.0, 0.0);

    for(int y=-1; y<=1; y++)
    {
        for(int x=-1; x<=1; x++)
        {
            vec2 lattice = vec2(x,y);
            vec2 offset = unity_voronoi_noise_randomVector(lattice + g, AngleOffset);
            float d = distance(lattice + offset, f);
            if(d < res.x)
            {
                res = vec3(d, offset.x, offset.y);
                Out = res.x;
                Cells = res.y;
                dir = vec4(f-(lattice + offset),0.0,0.0);
            }
        }
    }
}`,
    getShaderCode(node, context) {
      const out = context.getShaderVar(node, "out", true);
      const cell = context.getShaderVar(node, "cell", true);
      const dir = context.getShaderVar(node, "dir", true);
      return `float ${out} = 0.0;
      float ${cell} = 0.0;
      vec4 ${dir} = vec4(0.0,0.0,0.0,0.0);
      Voronoi(${context.getShaderVar(node, "uv")}.xy, ${context.getShaderVar(node, "angleOffset")}, ${context.getShaderVar(node, "cellDensity")}, ${out}, ${cell}, ${dir});`;
    },
  },
  {
    id: "Checkerboard",
    hideInLibrary: false,
    icon: IconGizmo,
    description: "Generate a Checkerboard pattern",
    dataInputs: [
      { id: "uv", type: "vector2", defaultValue: createVector(0, 0) },
      { id: "freq", type: "vector2", defaultValue: createVector(2, 2) },
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
  },
  {
    id: "Sample Texture",
    hideInLibrary: false,
    icon: IconGizmo,
    description: "Sample a pixel from a UV",
    dataInputs: [
      { id: "uv", type: "vector2", defaultValue: createVector(0, 0) },
      { id: "sampler", type: "image", defaultValue: null },
    ],

    dataOutputs: [{ id: "out", type: "color", defaultValue: createColor() }],
    tags: ["UV"],
    executeOutputs: [],
    settings: [],
    getShaderCode(node, context) {
      return genShader(node, context, "vec4", "out", ["uv"], ([uv]) => `texture2D(uniform_${node.dataInputs["sampler"].connectedPort}, ${uv}.xy)`);
    },
  },
];
