import { IconGizmo } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createVector2 } from "../../Types/vectorDataType";

export const WorleyNoise: NodeDefinition = {
  id: "WorleyNoise",
  label: "Voronoi",
  hideInLibrary: false,
  icon: IconGizmo,
  description: "Generate a Voronoi pattern",
  dataInputs: [
    { id: "uv", type: "vector2", defaultValue: createVector2(0, 0) },
    { id: "angleOffset", type: "number", defaultValue: 5 },
    { id: "cellDensity", type: "number", defaultValue: 10 },
  ],

  dataOutputs: [
    { id: "out", type: "number", defaultValue: 0 },
    { id: "cell", type: "number", defaultValue: 0 },
    { id: "dir", type: "vector2", defaultValue: createVector2() },
  ],
  tags: ["Math", "Shader"],

  settings: [],
  shaderRequirement: `vec2 unity_voronoi_noise_randomVector (vec2 UV, float offset)
{
    mat2 m = mat2(15.27, 47.63, 99.41, 89.98);
    UV = fract(sin(UV*m) * 46839.32);
    return vec2(sin(UV.y*+offset)*0.5+0.5, cos(UV.x*offset)*0.5+0.5);
}

void Voronoi(vec2 UV, float AngleOffset, float CellDensity, out float Out, out float Cells, out vec2 dir)
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
                dir = f-(lattice + offset);
            }
        }
    }
}`,
  getShaderCode(node, context) {
    const out = context.getShaderVar(node, "out", "number", true);
    const cell = context.getShaderVar(node, "cell", "number", true);
    const dir = context.getShaderVar(node, "dir", "vector2", true);
    return `float ${out} = 0.0;
      float ${cell} = 0.0;
      vec2 ${dir} = vec2(0.0,0.0);
      Voronoi(${context.getShaderVar(node, "uv", "vector2")}, ${context.getShaderVar(node, "angleOffset", "number")}, ${context.getShaderVar(node, "cellDensity", "number")}, ${out}, ${cell}, ${dir});`;
  },
};
