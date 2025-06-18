import { Gradient, createColor } from "../../Types/vectorDataType";
import { clamp01 } from "./clamp01";
import { map } from "./colorUtils";
import { vectorLerp } from "./vectorUtils";

export function evaluateGradient(gradient: Gradient, pos: number) {
  if (gradient.length === 0) {
    return createColor();
  }
  let prev = gradient[0];
  if (pos <= prev.pos) {
    return prev.color;
  }
  for (var stop of gradient) {
    if (pos < stop.pos) {
      return vectorLerp(prev.color, stop.color, clamp01(map(prev.pos, stop.pos, pos)));
    } else {
      prev = stop;
    }
  }
  return prev.color;
}
