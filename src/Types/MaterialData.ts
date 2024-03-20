import { ImageData } from "./ImageData";
import { ExecutionContext } from "../Utils/createExecutionContext";
import { Color } from "./vectorDataType";

export type MaterialType = "emisive" | "regular" | "texture" | "wireframe";

export type MaterialData = {
  id: MaterialType;
  color?: Color;
  texture?: ImageData | null;
  colorWireframe?: Color;
  wireframeWeight?: number;
};

const MaterialFunctions: { [key in MaterialType]: (context: ExecutionContext, mat: MaterialData) => void } = {
  emisive: (context, mat) => {
    context.target.noStroke();
    var color = mat.color as Color;
    context.target.fill(0);
    context.target.emissiveMaterial(color[0] * 255, color[1] * 255, color[2] * 255);
    context.target.ambientMaterial(0);
  },
  regular: (context, mat) => {
    context.target.noStroke();
    var color = mat.color as Color;
    context.target.fill(color[0] * 255, color[1] * 255, color[2] * 255);
    context.target.emissiveMaterial(0);
    context.target.ambientMaterial(color[0] * 255, color[1] * 255, color[2] * 255);
  },
  texture: (context, mat) => {
    context.target.noStroke();
    context.target.fill(255, 255, 255);
    if (mat.texture?.image != null) {
      context.target.texture(mat.texture?.image);
    }
  },
  wireframe: function (context: ExecutionContext, mat: MaterialData): void {
    var color = mat.color as Color;
    var colorW = mat.colorWireframe as Color;
    var wireframeWeight = mat.wireframeWeight as number;
    if (color[3] > 0) {
      context.target.fill(color[0] * 255, color[1] * 255, color[2] * 255, color[3] * 255);
    } else {
      context.target.noFill();
    }
    //
    context.target.stroke(colorW[0] * 255, colorW[1] * 255, colorW[2] * 255, colorW[3] * 255);
    context.target.strokeWeight(wireframeWeight);
  },
};

export function executeMaterial(context: ExecutionContext, mat: MaterialData) {
  return MaterialFunctions[mat.id](context, mat);
}
