import { IconGridDots, IconWaveSine } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createVector2 } from "../../Types/vectorDataType";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";

export const Noise: NodeDefinition = {
  id: "Noise",
  tags: ["Math"],
  icon: DoubleIconGen(IconGridDots, IconWaveSine),
  alias: "Perlin",
  description: "return a semi random continous value between 0 and 1 for points in 2d. ",
  dataInputs: [
    { id: "pos", type: "vector2", defaultValue: createVector2() },
    { id: "scale", type: "vector2", defaultValue: createVector2(1, 1) },
    { id: "time", type: "number", defaultValue: 0 },
  ],
  dataOutputs: [{ id: "result", type: "number", defaultValue: 0 }],

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

float GradientNoise_float(vec2 UV, vec2 Scale)
{
    return gradientNoise(UV * Scale) + 0.5;
}`,
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "result", ["pos", "scale"], ({ pos, scale }) => `GradientNoise_float(${pos}, ${scale})`);
  },
  getData: (portId, nodeData, context) => {
    if (portId === "result") {
      var pos = context.getInputValueVector(nodeData, "pos");
      var scale = context.getInputValueVector(nodeData, "scale");
      var time = context.getInputValueNumber(nodeData, "time");
      return context.p5.noise(pos[0] * scale[0], pos[1] * scale[1], time);
    }
  },
};
