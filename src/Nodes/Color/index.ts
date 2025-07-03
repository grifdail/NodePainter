import { ColorGradientNodes } from "./Gradient";
import { HSL } from "./HSL";
import { HSV } from "./HSV";
import { OKLCH } from "./OKLCH";
import { Palette } from "./Palette";
import { SetAlpha } from "./SetAlpha";

export const ColorNodes = [
  //
  ...ColorGradientNodes,
  HSL,
  HSV,
  OKLCH,
  Palette,
  SetAlpha,
];
