import { Color } from "./vectorDataType";

export type GraphArea = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: Color;
  relative: boolean;
  name: string;
};
