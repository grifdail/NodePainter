import p5 from "p5";
import { ImageData } from "./ImageData";
import { Color } from "./vectorDataType";

export type MaterialData = {
  id: string;
  color?: Color;
  texture?: ImageData | null;
  colorWireframe?: Color;
  wireframeWeight?: number;
  shader?: p5.Shader;
  uniforms?: { [key: string]: any };
};
