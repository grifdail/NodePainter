import { CMYKNode } from "./CMYKNode";
import { ColorGradientNodes } from "./Gradient";
import { HSLNode } from "./HSLNode";
import { HSVNode } from "./HSVNode";
import { MixNode } from "./MixNode";
import { OKLCHNode } from "./OKLCHNode";
import { PaletteNode } from "./PaletteNode";
import { SetAlphaNode } from "./SetAlphaNode";
import { ToCMYWNode } from "./toCMYKNode";
import { ToHSLNode } from "./toHSLNode";
import { ToHSVNode } from "./toHSVNode";

export const ColorNodes = [
  //
  ...ColorGradientNodes,
  CMYKNode,
  HSLNode,
  HSVNode,
  MixNode,
  OKLCHNode,
  PaletteNode,
  SetAlphaNode,
  ToCMYWNode,
  ToHSLNode,
  ToHSVNode,
];
