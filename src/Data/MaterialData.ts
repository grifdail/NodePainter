import { ExecutionContext } from "./createExecutionContext";
import { Color, createColor } from "./vectorDataType";

export type MaterialType = "emisive" | "regular" | "specular";

export type MaterialData = {
  id: MaterialType;
  [key: string]: any;
};

const MaterialFunctions: { [key in MaterialType]: (context: ExecutionContext, mat: MaterialData) => void } = {
  emisive: (ctx, mat) => {
    ctx.target.fill(0);
    ctx.target.emissiveMaterial(mat.color[0] * 255, mat.color[1] * 255, mat.color[2] * 255);
    ctx.target.ambientMaterial(0);
  },
  regular: (ctx, mat) => {
    ctx.target.fill(mat.color[0] * 255, mat.color[1] * 255, mat.color[2] * 255);
    ctx.target.emissiveMaterial(0);
    ctx.target.ambientMaterial(mat.color[0] * 255, mat.color[1] * 255, mat.color[2] * 255);
  },
  specular: (ctx, mat) => {},
};

export function executeMaterial(context: ExecutionContext, mat: MaterialData) {
  return MaterialFunctions[mat.id](context, mat);
}
export function createDefaultMaterial(color?: Color): MaterialData {
  return {
    id: "emisive",
    color: color || createColor(1, 1, 1),
  };
}
