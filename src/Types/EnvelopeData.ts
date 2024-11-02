import { clamp01, map } from "../Utils/colorUtils";
import { VectorLerp } from "../Utils/vectorUtils";
import { createColor } from "./vectorDataType";

export enum EnvelopeEasingType {
  Linear = "linear",
  Horizontal = "horizontal",
  Vertical = "vertical",
  Easein = "easein",
  Easeout = "easeout",
  Easeinout = "easeinout",
}
export const EnvelopeEasingTypeArray = Object.values(EnvelopeEasingType);

export type EnvelopeData = EnvelopeStop[];
export type EnvelopeStop = {
  pos: number;
  height: number;
  lerp: EnvelopeEasingType;
};
export const createDefaultEnvelope = (): EnvelopeData => [
  { pos: 0, height: 0, lerp: EnvelopeEasingType.Linear },
  { pos: 1, height: 1, lerp: EnvelopeEasingType.Linear },
];

const lerpFunction: { [key in EnvelopeEasingType]: (x: number) => number } = {
  linear: (x) => x,
  horizontal: (x) => 0,
  vertical: (x) => 1,
  easein: (x) => x * x,
  easeout: (x) => x * (2 - x),
  easeinout: (x) => (x < 0.5 ? 2 * x * x : -1 + (4 - 2 * x) * x),
};

export const createDefaultEnvelopeStop = (): EnvelopeStop => ({
  pos: 0.5,
  height: 0.5,
  lerp: EnvelopeEasingType.Linear,
});
export function interpolateEnvelope(envelope: EnvelopeData, pos: number): any {
  if (envelope.length === 0) {
    return createColor();
  }
  let prev = envelope[0];
  if (pos <= prev.pos) {
    return prev.height;
  }
  for (var stop of envelope) {
    if (pos < stop.pos) {
      return VectorLerp([prev.height], [stop.height], lerpFunction[prev.lerp](clamp01(map(prev.pos, stop.pos, pos))));
    } else {
      prev = stop;
    }
  }
  return prev.height;
}
