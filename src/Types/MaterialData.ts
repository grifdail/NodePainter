import { ImageData } from "./ImageData";
import { Color } from "./vectorDataType";

export type MaterialData = {
  id: string;
  color?: Color;
  texture?: ImageData | null;
  colorWireframe?: Color;
  wireframeWeight?: number;
};
