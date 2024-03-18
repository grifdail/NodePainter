import { ImageData } from "./ImageData";
import { ExecutionContext } from "../Utils/createExecutionContext";
import { Color } from "./vectorDataType";

export type MaterialType = "emisive" | "regular" | "texture";

export type MaterialData = {
  id: MaterialType;
  color?: Color;
  texture?: ImageData | null;
};

const MaterialFunctions: { [key in MaterialType]: (context: ExecutionContext, mat: MaterialData) => void } = {
  emisive: (ctx, mat) => {
    var color = mat.color as Color;
    ctx.target.fill(0);
    ctx.target.emissiveMaterial(color[0] * 255, color[1] * 255, color[2] * 255);
    ctx.target.ambientMaterial(0);
  },
  regular: (ctx, mat) => {
    var color = mat.color as Color;
    ctx.target.fill(color[0] * 255, color[1] * 255, color[2] * 255);
    ctx.target.emissiveMaterial(0);
    ctx.target.ambientMaterial(color[0] * 255, color[1] * 255, color[2] * 255);
  },
  texture: (ctx, mat) => {
    ctx.target.fill(255, 255, 255);
    if (mat.texture?.image != null) {
      ctx.target.texture(mat.texture?.image);
    }
  },
};

export function executeMaterial(context: ExecutionContext, mat: MaterialData) {
  return MaterialFunctions[mat.id](context, mat);
}
